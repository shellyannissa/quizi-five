// initializeDatabase.js

const { Client } = require("pg");
const { initializeDatabase } = require("./database/db"); // Import your database connection function

const client = new Client();
initializeDatabase(client);

const createTables = async () => {
  try {
    await client.connect();

    // Your table creation SQL statements
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

    await client.query(createUsersTable);

    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally {
    await client.end();
  }
};

createTables();
