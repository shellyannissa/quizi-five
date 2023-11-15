const asyncHandler = require("express-async-handler");
const pool = require("../database/db");

const registerQuiz = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const { quizId, uid } = req.body;
    const points = 0;
    let position = 0;
    const positionQuery = `
    SELECT COUNT(*) FROM "Registration" WHERE quizId = $1;`;
    const result = await client.query(positionQuery, [quizId]);
    position = parseInt(result.rows[0].count) + 1;
    const insertQuery = `
        INSERT INTO "Registration"
        (uid, quizId, points, position)
        VALUES ($1, $2, $3, $4) RETURNING uid;`;
    insertRegistration = await client.query(insertQuery, [
      uid,
      quizId,
      points,
      position,
    ]);
    client.release();
    res.json(insertRegistration.rows[0]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});

const allRegistrations = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "Registration"');
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const quizRegistrations = asyncHandler(async (req, res) => {
  try {
    const { quizId } = req.body;
    const client = await pool.connect();
    console.log(quizId);
    const allrecords = await client.query(
      'SELECT * FROM "Registration" WHERE quizid = $1',
      [quizId]
    );
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const unRegister = asyncHandler(async (req, res) => {
  const { quizId, uid } = req.body;
  try {
    const client = await pool.connect();
    const deleteQuery = `
    DELETE FROM "Registration" WHERE quizId = $1 AND uid = $2;`;
    const result = await client.query(deleteQuery, [quizId, uid]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

module.exports = {
  registerQuiz,
  allRegistrations,
  quizRegistrations,
  unRegister,
};
