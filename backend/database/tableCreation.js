const pool = require("./db");

const createUsersTable = async () => {
  try {
    const client = await pool.connect();

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "User" (
      uid UUID PRIMARY KEY,
      name VARCHAR(25),
      password VARCHAR(40),
      email VARCHAR(30),
      image VARCHAR(30));
    `;

    await client.query(createTableQuery);

    client.release();

    console.log("User table created successfully");
  } catch (err) {
    console.error("Error creating User table:", err);
  }
};

module.exports = { createUsersTable };
