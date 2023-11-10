const express = require("express");
const app = express();
require("dotenv").config();

const { createUsersTable } = require("./database/tableCreation");

const registerUser = require("./controllers/userController");

// Middleware setup

app.use(express.json());

// Create the "User" table
createUsersTable();

// Register user
app.post("/register2", async (req, res) => {
  try {
    const user = await registerUser(req, res);
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/allrecords", async (req, res) => {
  try {
    const pool = require("./database/db");
    const client = await pool.connect();
    const allrecords = await client.query('SELECT * FROM "User"');
    console.log(allrecords.rows);
    res.json(allrecords.rows);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
