const asyncHandler = require("express-async-handler");
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../database/generateToken");

function generateUUID() {
  return uuidv4();
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  try {
    // Check if the user already exists in the database
    const client = await pool.connect();

    const userExists = await client.query(
      "SELECT * FROM users WHERE email = $1",
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
      [uid, name, email, password, pic]
    );

    if (newUser.rows.length > 0) {
      // Check if any rows were returned
      res.status(201).json({
        _id: newUser.rows[0].uid,
        name,
        email,
        pic,
        token: generateToken(newUser.rows[0].uid), // Use the actual ID
      });
    } else {
      res.status(400);
      throw new Error("Failed to create a new user");
    }

    client.release();
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal Server Error");
  }
});

module.exports = registerUser;
