const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../database/utilities");
const { updateAllQuizStatus } = require("./quizController");

function generateUUID() {
  return uuidv4();
}

const allUsers = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "User"');
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);
    client.release();
    if (user.rows.length > 0) {
      console.log(user.rows[0].password, password);
      if (user.rows[0].password === password) {
        res.json({
          _id: user.rows[0].uid,
          name: user.rows[0].name,
          email: user.rows[0].email,
          image: user.rows[0].image,
          token: generateToken(user.rows[0].uid),
        });
      } else {
        res.status(401);

        throw new Error("Invalid Password");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);

    throw new Error(error.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  try {
    const client = await pool.connect();
    const deleteQuery = `
    DELETE FROM "User" WHERE uid = $1;`;
    const result = await client.query(deleteQuery, [uid]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);
    client.release();
    if (user.rows.length > 0) {
      if (user.rows[0].password === password) {
        const updatedUser = await client.query(
          'UPDATE "User" SET name = $1, email = $2, password = $3, image = $4 WHERE uid = $5 RETURNING *',
          [name, email, password, image, user.rows[0].uid]
        );
        res.json({
          _id: updatedUser.rows[0].uid,
          name: updatedUser.rows[0].name,
          email: updatedUser.rows[0].email,
          image: updatedUser.rows[0].image,
          token: generateToken(updatedUser.rows[0].uid),
        });
      } else {
        res.status(401);
        throw new Error("Invalid Password");
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  console.log(req.body);
  // if (!name || !email || !password) {
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  try {
    // Check if the user already exists in the database
    const client = await pool.connect();

    const userExists = await client.query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      // Check if any rows were returned
      client.release();
      res.status(400);
      throw new Error("User already exists in the database");
    }

    // Generate a UUID for the new user
    const uid = generateUUID(); // You should have a function to generate UUIDs

    // Insert the new user into the database
    const newUser = await client.query(
      'INSERT INTO "User"(uid, name, email, password, image) VALUES($1, $2, $3, $4, $5) RETURNING uid;',
      [uid, name, email, password, image]
    );

    if (newUser.rows.length > 0) {
      // Check if any rows were returned
      res.status(201).json({
        _id: newUser.rows[0].uid,
        name,
        email,
        image,
        token: generateToken(newUser.rows[0].uid), // Use the actual ID
      });
    } else {
      res.status(400);
      throw new Error("Failed to create a new user");
    }

    client.release();
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const registeredQuizzes = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  try {
    const client = await pool.connect();
    await updateAllQuizStatus();
    const allrecordrows = await client.query(
      'SELECT * FROM "Quiz" WHERE quizId IN (SELECT quizId FROM "Registration" WHERE uid = $1)',
      [uid]
    );
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
        buttonContent: "Register",
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

const unregisteredQuizzes = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  try {
    const client = await pool.connect();
    await updateAllQuizStatus();
    const allrecordrows = await client.query(
      'SELECT * FROM "Quiz" WHERE quizId NOT IN (SELECT quizId FROM "Registration" WHERE uid = $1)',
      [uid]
    );
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
        buttonContent: "Register",
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

const history = asyncHandler(async (req, res) => {
  const { uid } = req.body;
  try {
    const client = await pool.connect();
    const allrecords = await client.query(
      `SELECT image,"Quiz".name quizName, points, position, eventTime
       FROM "Quiz" JOIN "Registration" ON "Quiz".quizId = "Registration".quizId 
      WHERE uid = $1 and status = 'completed'
      ORDER BY eventTime DESC`,
      [uid]
    );
    client.release();
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

module.exports = {
  allUsers,
  authUser,
  registerUser,
  updateUser,
  deleteUser,
  registeredQuizzes,
  unregisteredQuizzes,
  history,
};
