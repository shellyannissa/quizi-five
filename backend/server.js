const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { client, initializeDatabase } = require("./database/db");

//middleware
app.use(cors());
app.use(express.json());
initializeDatabase();

app.get("/", async (req, res) => {
  try {
    // Select all rows from the Users table
    const result = await client.query("SELECT * FROM Users");
    console.log(result.rows);
    // Send the result as JSON response
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
