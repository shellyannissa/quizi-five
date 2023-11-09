const express = require("express");
const app = express();
const cors = require("cors");
const { client } = require("./database/db");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.json("hello world");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
