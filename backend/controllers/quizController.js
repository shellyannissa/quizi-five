const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../database/generateToken");

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

const quizQuestions = asyncHandler(async (req, res) => {
  const { quizId } = req.body;

  //! control does not pass onto updateAllQuestions function
  await updateAllQuizStatus();
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
    console.log(newQuiz);
    if (newQuiz.rows.length > 0) {
      return res.status(201).json({
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

const allQuizzes = asyncHandler(async (req, res) => {
  try {
    await updateAllQuizStatus();
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "Quiz"');
    res.json(allrecords.rows);
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
    if (deletedQuiz.rows.length > 0) {
      return res.status(201).json({
        quizId: deletedQuiz.rows[0].quizid,
      });
    } else {
      res.status(400).json({ error: "Quiz not deleted" });
      throw new Error("Quiz not deleted");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
  updateAllQuizStatus,
  deleteQuiz,
  terminateQuiz,
};
