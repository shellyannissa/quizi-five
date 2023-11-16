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

const updateCrctOption = asyncHandler(async (req, res) => {
  //! must add content
});
module.exports = {
  addQuestion,
  allQuestions,
  activateQuestion,
  deleteQuestion,
  endQuestion,
};
