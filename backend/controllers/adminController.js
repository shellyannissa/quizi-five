const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../database/generateToken");

function generateUUID() {
  return uuidv4();
}

const allAdmins = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "Admin"');
    res.json(allrecords.rows);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    throw new Error(error.message);
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please Enter all the Fields");
    throw new Error("Please Enter all the Fields");
  }
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM "Admin" WHERE email = $1', [
      email,
    ]);
    if (user.rows.length > 0) {
      if (user.rows[0].password === password) {
        res.json({
          _id: user.rows[0].adminId,
          name: user.rows[0].name,
          email: user.rows[0].email,
          noOfQuizzes: user.rows[0].noOfQuizzes,
          token: generateToken(user.rows[0].adminId),
        });
      } else {
        res.status(401);

        throw new Error("Invalid Password");
      }
    } else {
      res.status(404);
      throw new Error("Admin not found");
    }
  } catch (error) {
    res.status(500);

    throw new Error(error.message);
  }
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, noOfQuizzes } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  try {
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);
    if (user.rows.length > 0) {
      if (user.rows[0].password === password) {
        const updatedUser = await client.query(
          'UPDATE "Admin" SET name = $1, email = $2, password = $3, image = $4 WHERE adminId = $5 RETURNING *',
          [name, email, password, noOfQuizzes, user.rows[0].adminId]
        );
        res.json({
          _id: updatedUser.rows[0].adminId,
          name: updatedUser.rows[0].name,
          email: updatedUser.rows[0].email,
          noOfQuizzes: updatedUser.rows[0].noOfQuizzes,
          token: generateToken(updatedUser.rows[0].adminId),
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

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, noOfQuizzes } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  try {
    // Check if the user already exists in the database
    const client = await pool.connect();

    const adminExists = await client.query(
      'SELECT * FROM "Admin" WHERE email = $1',
      [email]
    );

    if (adminExists.rows.length > 0) {
      // Check if any rows were returned
      client.release();
      res.status(400);
      throw new Error("User already exists in the database");
    }

    // Generate a UUID for the new user
    const adminId = generateUUID(); // You should have a function to generate UUIDs

    // Insert the new user into the database
    const newAdmin = await client.query(
      'INSERT INTO "Admin"(adminId, name, email, password, noOfQuizzes) VALUES($1, $2, $3, $4, $5) RETURNING adminId;',
      [adminId, name, email, password, noOfQuizzes]
    );

    if (newAdmin.rows.length > 0) {
      // Check if any rows were returned
      res.status(201).json({
        _id: newAdmin.rows[0].adminId,
        name,
        email,
        noOfQuizzes,
        token: generateToken(newAdmin.rows[0].adminId), // Use the actual ID
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

module.exports = { allAdmins, authAdmin, updateAdmin, registerAdmin };
