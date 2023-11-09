const { Client } = require("pg");

const config = {
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_NAME,
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
