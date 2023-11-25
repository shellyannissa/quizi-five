const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const utilities = require("../database/utilities");

function generateUUID() {
  return uuidv4();
}

const addAnswer = asyncHandler(async (req, res) => {
  const { uid, questionId, quizId, optionId } = req.body;

  try {
    const client = await pool.connect();
    const currentTime = new Date();
    const insertQuery = `
                    INSERT INTO "Answer"
                    (uid, questionId, quizId, optionId, answeredInstant)
                    VALUES ($1, $2, $3, $4, $5) RETURNING uid;`;

    const newAnswer = await client.query(insertQuery, [
      uid,
      questionId,
      quizId,
      optionId,
      currentTime,
    ]);
    client.release();
    if (newAnswer.rowCount > 0) {
      res.status(201).json({
        uid: newAnswer.rows[0].uid,
      });
    } else {
      res.status(400).send("Bad Request");
      throw new Error("Couldn't create Answer");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const allAnswers = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "Answer"');
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const detailedAnswers = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query(
      `SELECT "Question".description Qn, "Option".description Op, "User".name User, "Quiz".name Quiz
    FROM "Answer" JOIN "Question" ON "Answer".questionId = "Question".questionId
   JOIN "Quiz" ON "Answer".quizId = "Quiz".quizId JOIN "User" ON "Answer".uid = "User".uid
   JOIN "Option" ON "Answer".optionId = "Option".optionId;`
    );
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

module.exports = { addAnswer, allAnswers, detailedAnswers };
