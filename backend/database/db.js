// db.js

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = pool;
