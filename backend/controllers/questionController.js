const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../database/generateToken");

function generateUUID() {
  return uuidv4();
}

const quizQuestions = asyncHandler(async (req, res) => {
  const { quizId } = req.body;
  try {
    const client = await pool.connect();
    const allrecords = await client.query(
      'SELECT * FROM "Question" WHERE quizId = $1',
      [quizId]
    );
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const addQuestion = asyncHandler(async (req, res) => {
  const { quizId, weightage, question, options, correctOption } = req.body;
  const questionId = generateUUID();
  try {
    const client = await pool.connect();

    const insertQuery = `
        INSERT INTO "Question" 
        (questionId, quizId, weightage, question, options, correctOption)
        VALUES ($1, $2, $3, $4, $5, $6)`;
    await client.query(insertQuery, [
      questionId,
      quizId,
      weightage,
      question,
      options,
      correctOption,
    ]);
    res.json("Question Added Successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});
