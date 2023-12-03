const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const utilities = require("../database/utilities");

function generateUUID() {
  return uuidv4();
}

const addQuestion = asyncHandler(async (req, res) => {
  const { quizId, weightage, description, allottedMin, allottedSec } = req.body;
  const questionId = generateUUID();
  try {
    const client = await pool.connect();
    const insertQuery = `
              INSERT INTO "Question"
              (questionId, quizId, weightage, description, allottedMin, allottedSec, started)
              VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING questionId;`;

    const newQuestion = await client.query(insertQuery, [
      questionId,
      quizId,
      weightage,
      description,
      allottedMin,
      allottedSec,
      false,
    ]);
    client.release();
    console.log(newQuestion);
    if (newQuestion.rows.length > 0) {
      res.status(201).json({
        questionId: newQuestion.rows[0].questionid,
      });
    } else {
      res.status(400).send("Bad Request");
      throw new Error("Couldn't create Question");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const allQuestions = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "Question"');
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  try {
    const { questionId } = req.body;
    const client = await pool.connect();
    const deleteQuery = `
    DELETE FROM "Question" WHERE questionId = $1;`;
    await client.query(deleteQuery, [questionId]);
    client.release();
    res.status(200).send("Question Deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const activateQuestion = asyncHandler(async (req, res) => {
  try {
    const { questionId } = req.body;
    const client = await pool.connect();
    const getQuery = `
    SELECT ALLOTTEDMIN, ALLOTTEDSEC FROM "Question" WHERE questionId = $1;`;
    const time = await client.query(getQuery, [questionId]);
    const { allottedmin, allottedsec } = time.rows[0];
    const currentTime = new Date();
    const endingInstant = utilities.addMinutesAndSeconds(
      currentTime,
      allottedmin,
      allottedsec
    );
    console.log(utilities.convertUTCToIST(currentTime));
    console.log(utilities.convertUTCToIST(endingInstant));
    const updateQuery = `
    UPDATE "Question" SET started = true, startedInstant = $1, endingInstant = $2 WHERE questionId = $3;`;
    await client.query(updateQuery, [currentTime, endingInstant, questionId]);

    //! must add functionality to calculate points and position after the specified time

    console.log(endingInstant.getTime() - currentTime.getTime());

    const quizIdQuery = `
    SELECT quizId FROM "Question" WHERE questionId = $1;`;
    const quizId = (await client.query(quizIdQuery, [questionId])).rows[0]
      .quizid;
    const optionIdQuery = `
      SELECT correctOptionId FROM "Question" WHERE questionId = $1;`;
    const optionId = (await client.query(optionIdQuery, [questionId])).rows[0]
      .optionId;
    setTimeout(() => {
      calculatePoints(questionId, optionId);
      updatePostition(quizId);
      console.log("points updated");
    }, endingInstant.getTime() - currentTime.getTime());

    client.release();
    res.status(200).send("Question Activated");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const endQuestion = asyncHandler(async (req, res) => {
  try {
    const { questionId } = req.body;
    const client = await pool.connect();
    const updateQuery = `
    UPDATE "Question" SET started = false WHERE questionId = $1;`;
    await client.query(updateQuery, [questionId]);
    client.release();
    res.status(200).send("Question Ended");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const activeQns = asyncHandler(async (req, res) => {
  try {
    const { quizId } = req.body;

    const client = await pool.connect();
    const query = `
  SELECT questionId, description FROM "Question" WHERE quizId = $1 AND started = true;`;
    const activeQns = (await client.query(query, [quizId])).rows;
    let result = [];
    for (const qn of activeQns) {
      const qnId = qn.questionid;
      const question = qn.description;
      const optionIdQuery = `
    SELECT optionId, description FROM "Option" WHERE questionId = $1 ;`;
      const options = (await client.query(optionIdQuery, [qnId])).rows;
      result.push({
        questionId: qnId,
        question: question,
        options: options,
      });
    }

    client.release();
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const updateCrctOption = asyncHandler(async (req, res) => {
  try {
    const { questionId, optionId } = req.body;
    const client = await pool.connect();
    const updateQuery = `
    UPDATE "Question" SET correctOptionId = $1 WHERE questionId = $2;`;
    await client.query(updateQuery, [optionId, questionId]);

    const quizIdQuery = `
    SELECT quizId FROM "Question" WHERE questionId = $1;`;
    const quizId = (await client.query(quizIdQuery, [questionId])).rows[0]
      .quizid;
    client.release();
    res.status(200).send("Correct Option Updated");
    // await calculatePoints(questionId, optionId);
    // await updatePostition(quizId);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const partialPoints = async (questionId, uid) => {
  const client = await pool.connect();
  console.log("inside partial points");
  const query = `
      SELECT endingInstant FROM "Question" WHERE questionId = $1;`;
  const endingInstant = (await client.query(query, [questionId])).rows[0]
    .endinginstant;
  const query2 = `
    SELECT startedInstant FROM "Question" WHERE questionId = $1;`;
  const startedInstant = (await client.query(query2, [questionId])).rows[0]
    .startedinstant;
  console.log(utilities.convertUTCToIST(startedInstant));
  console.log(utilities.convertUTCToIST(endingInstant));
  const query3 = `
      SELECT answeredInstant FROM "Answer" WHERE questionId = $1 and uid = $2;`;
  const answeredInstant = (await client.query(query3, [questionId, uid]))
    .rows[0].answeredinstant;
  console.log(utilities.convertUTCToIST(answeredInstant));
  let partialPoints;
  if (answeredInstant > endingInstant) {
    partialPoints = 0;
  } else {
    partialPoints =
      (endingInstant - answeredInstant) / (endingInstant - startedInstant);
  }
  client.release();
  console.log(partialPoints);
  return partialPoints;
};

const calculatePoints = async (questionId, optionId) => {
  const client = await pool.connect();

  const weightageQuery = `
      SELECT weightage FROM "Question" WHERE questionId = $1;`;
  const weightage = (await client.query(weightageQuery, [questionId])).rows[0]
    .weightage;
  console.log(weightage);
  let points;
  const uidQuery = `
      SELECT uid FROM "Answer" WHERE optionId = $1 AND  questionId = $2;`;
  const rightUsers = (await client.query(uidQuery, [optionId, questionId]))
    .rows;
  for (let i = 0; i < rightUsers.length; i++) {
    const uid = rightUsers[i].uid;
    points = parseInt(weightage * (await partialPoints(questionId, uid)));
    console.log(points);
    const updateQuery = `
    UPDATE "Registration" SET points =points+ $1 WHERE uid = $2 ;`;
    await client.query(updateQuery, [points, uid]);
  }
  client.release();
};

const updatePostition = async (quizId) => {
  const client = await pool.connect();
  const query = `
  SELECT uid, points FROM "Registration" WHERE quizId = $1 ORDER BY points DESC;`;
  const allUsers = (await client.query(query, [quizId])).rows;
  for (let i = 0; i < allUsers.length; i++) {
    const uid = allUsers[i].uid;
    const position = i + 1;
    const updateQuery = `
    UPDATE "Registration" SET position = $1 WHERE uid = $2;`;
    await client.query(updateQuery, [position, uid]);
  }
  client.release();
};

module.exports = {
  addQuestion,
  allQuestions,
  activateQuestion,
  deleteQuestion,
  endQuestion,
  updateCrctOption,
  activeQns,
};
