const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { client, initializeDatabase } = require("./database/db");

//middleware
app.use(cors());
app.use(express.json());
const call = async () => {
  await client.query("drop table users;");
  await client.query(
    "create table users(id serial primary key, email varchar(255), password varchar(255) not null);"
  );
};
call();

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await client.query(
      "insert into users(email,password) values($1,$2) returning *;",
      [email, password]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

app.get("/allrecords", async (req, res) => {
  try {
    const allrecords = await client.query("select * from users;");
    res.json(allrecords.rows);
  } catch (err) {
    console.log(err);
  }
});

try {
  initializeDatabase();
} catch (error) {
  console.log(error);
}

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
