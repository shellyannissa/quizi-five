const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");

function generateUUID() {
  return uuidv4();
}

const addOption = asyncHandler(async (req, res) => {
  const { questionId, description, quizId } = req.body;
  const optionId = generateUUID();
  try {
    const client = await pool.connect();
    const insertQuery = `
                INSERT INTO "Option"
                (optionId, quizId, questionId, description)
                VALUES ($1, $2, $3, $4) RETURNING optionId;`;

    const newOption = await client.query(insertQuery, [
      optionId,
      quizId,
      questionId,
      description,
    ]);
    client.release();
    console.log(newOption);
    if (newOption.rows.length > 0) {
      res.status(201).json({
        optionId: newOption.rows[0].optionid,
      });
    } else {
      res.status(400).send("Bad Request");
      throw new Error("Couldn't create Option");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const allOptions = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "Option"');
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const deleteOption = asyncHandler(async (req, res) => {
  const { optionId } = req.body;
  try {
    const client = await pool.connect();
    const deleteQuery = `
                    DELETE FROM "Option"
                    WHERE optionId = $1;`;
    const deletedOption = await client.query(deleteQuery, [optionId]);
    client.release();
    if (deletedOption.rowCount > 0) {
      res.status(200).send("Option Deleted");
    } else {
      res.status(400).send("Bad Request");
      throw new Error("Couldn't delete Option");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const getOptions = asyncHandler(async (req, res) => {
  const { questionId } = req.body;
  try {
    const client = await pool.connect();
    const getQuery = `
                        SELECT * FROM "Option"
                        WHERE questionId = $1;`;
    const options = await client.query(getQuery, [questionId]);
    client.release();

    res.status(200).json(options.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});
module.exports = { addOption, allOptions, deleteOption, getOptions };
