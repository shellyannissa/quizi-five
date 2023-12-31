const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../database/utilities");

function generateUUID() {
  return uuidv4();
}

function calculateEventStatus(eventTime) {
  const dateTime = new Date(eventTime);
  const currDate = new Date();

  if (isNaN(dateTime)) {
    return "completed"; // Invalid date
  } else if (dateTime > currDate) {
    return "upcoming";
  } else {
    return "ongoing";
  }
}

const getQuizDetails = asyncHandler(async (req, res) => {
  const { quizId } = req.body;
  try {
    const client = await pool.connect();
    const quizDetails = await client.query(
      'SELECT * FROM "Quiz" WHERE quizId = $1',
      [quizId]
    );
    client.release();
    res.json(quizDetails.rows[0]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const quizQuestions = asyncHandler(async (req, res) => {
  const { quizId } = req.body;
  try {
    const client = await pool.connect();
    const allrecords = await client.query(
      'SELECT * FROM "Question" WHERE quizId = $1',
      [quizId]
    );
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const createQuiz = asyncHandler(async (req, res) => {
  const { name, image, eventTime, description, adminId } = req.body;
  try {
    const client = await pool.connect();
    const quizId = generateUUID();
    const status = calculateEventStatus(eventTime);

    const insertQuery = `
              INSERT INTO "Quiz"
              (quizId, name, image, eventTime, status, description, adminId)
              VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING quizId;`;

    const newQuiz = await client.query(insertQuery, [
      quizId,
      name,
      image,
      eventTime,
      status,
      description,
      adminId,
    ]);
    client.release();

    if (newQuiz.rows.length > 0) {
      return res.send({
        quizId: newQuiz.rows[0].quizid,
      });
    } else {
      res.status(400).json({ error: "Quiz not created" });
      throw new Error("Quiz not created");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const editQuiz = asyncHandler(async (req, res) => {
  const { quizId, name, image, eventTime, description } = req.body;
  try {
    const client = await pool.connect();
    const status = calculateEventStatus(eventTime);

    const updateQuery = `
              UPDATE "Quiz"
              SET name = $1, image = $2, eventTime = $3, description = $4
              WHERE quizId = $5 RETURNING *;`;

    const updatedQuiz = await client.query(updateQuery, [
      name,
      image,
      eventTime,
      description,
      quizId,
    ]);
    client.release();
    console.log(updatedQuiz);
    if (updatedQuiz.rows.length > 0) {
      return res.status(201).json({
        quizId: updatedQuiz.rows[0].quizid,
      });
    } else {
      res.status(400).json({ error: "Quiz not updated" });
      throw new Error("Quiz not updated");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const activeQns = asyncHandler(async (req, res) => {
  try {
    const { quizId } = req.body;

    const client = await pool.connect();
    const query = `
  SELECT questionId, description,allottedMin, allottedSec,endingInstant FROM "Question" WHERE quizId = $1 AND started = true;`;

    const activeQns = (await client.query(query, [quizId])).rows;

    let result = [];
    for (const qn of activeQns) {
      const qnId = qn.questionid;
      const question = qn.description;
      const allottedMin = qn.allottedmin;
      const allottedSec = qn.allottedsec;
      const endingInstant = qn.endinginstant;
      const correctOptionId = (
        await client.query(
          'SELECT correctOptionId FROM "Question" WHERE questionId = $1 ;',
          [qnId]
        )
      ).rows[0].correctoptionid;
      const optionIdQuery = `
    SELECT optionId, description FROM "Option" WHERE questionId = $1 ;`;
      const options = (await client.query(optionIdQuery, [qnId])).rows;
      result.push({
        questionId: qnId,
        correctOptionId: correctOptionId,
        question: question,
        allottedMin: allottedMin,
        allottedSec: allottedSec,
        endingInstant: endingInstant,
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

const allQuizzes = asyncHandler(async (req, res) => {
  try {
    await updateAllQuizStatus();
    const client = await pool.connect();
    const allrecordrows = await client.query('SELECT * FROM "Quiz"');
    const allrecords = allrecordrows.rows;

    const formatQuizEntry = (quiz) => {
      const datetime = new Date(quiz.eventtime);
      const hours = datetime.getHours();
      const minutes = datetime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12;
      const month = datetime
        .toLocaleString("default", { month: "short" })
        .toUpperCase();
      const day = datetime.getDate();

      return {
        quizId: quiz.quizid,
        quizName: quiz.name,
        image: quiz.image,
        time: `${hours12}:${minutes} ${ampm}`,
        month: month,
        day: day,
        description: quiz.description,
      };
    };

    const formattedRecords = allrecords.map(formatQuizEntry);

    client.release();
    res.json(formattedRecords);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const updateAllQuizStatus = async () => {
  try {
    const client = await pool.connect();

    // Fetch all quiz records
    const result = await client.query(
      'SELECT quizId, eventTime,status FROM "Quiz"'
    );
    const quizRecords = result.rows;
    // Iterate through the records and update the status
    for (const record of quizRecords) {
      console.log("initial status of quiz", record.quizid, "is", record.status);
      if (record.status === "upcoming") {
        const newStatus = calculateEventStatus(record.eventtime);
        //   Update the status in the database
        await client.query('UPDATE "Quiz" SET status = $1 WHERE quizId = $2', [
          newStatus,
          record.quizid,
        ]);
        console.log(`Updated status of quiz ${record.quizid} to ${newStatus}`);
      }
    }

    client.release();
  } catch (error) {
    console.error("Error updating quiz status:", error);
  }
};

const deleteQuiz = asyncHandler(async (req, res) => {
  try {
    const { quizId } = req.body;
    console.log(quizId);
    const client = await pool.connect();
    const deleteQuery = `
                DELETE  FROM "Quiz"
                WHERE quizid = $1 ;`;

    const deletedQuiz = await client.query(deleteQuery, [quizId]);
    client.release();
    console.log(deletedQuiz.rows);

    return res.status(201).json({
      quizId: quizId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const getQnsandOptions = asyncHandler(async (req, res) => {
  const { quizId } = req.body;
  try {
    const client = await pool.connect();
    const allrecords = await client.query(
      `SELECT optionId, "Question".questionId, 
      "Question".quizId, "Option".description AS optionName, 
       "Question".description AS questionName
       FROM "Option","Question" WHERE "Question".quizId = $1 AND "Option".quizId = $1;`,
      [quizId]
    );
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const terminateQuiz = asyncHandler(async (req, res) => {
  try {
    const { quizId } = req.body;
    const client = await pool.connect();
    console.log(quizId);
    const terminateQuery = `
                UPDATE "Quiz"
                SET status = 'completed'
                WHERE quizId = $1 RETURNING *;`;

    const terminatedQuiz = await client.query(terminateQuery, [quizId]);
    client.release();
    console.log(terminatedQuiz);
    if (terminatedQuiz.rows.length > 0) {
      return res.status(201).json({
        quizId: terminatedQuiz.rows[0].quizid,
      });
    } else {
      res.status(400).json({ error: "Quiz not terminated" });
      // throw new Error("Quiz not terminated");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = {
  createQuiz,
  allQuizzes,
  getQuizDetails,
  updateAllQuizStatus,
  deleteQuiz,
  terminateQuiz,
  quizQuestions,
  editQuiz,
  getQnsandOptions,
  activeQns,
};
