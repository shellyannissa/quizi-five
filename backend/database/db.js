const { Client } = require("pg");

const config = {
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "sample",
};

const client = new Client(config);

const initializeDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Error connecting to PostgreSQL database", err);
  }
};

module.exports = {
  client,
  initializeDatabase,
};
