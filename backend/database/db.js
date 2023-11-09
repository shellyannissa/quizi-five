// import pg from 'pg';

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })

// pool.connect((err) =>{
//     if(err){
//         console.log(err);
// };
//     console.log("Connected to database");
// });

// module.exports = {pool};
// module.exports = {
//   client,
//   initializeDatabase,
// };

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

// client
//   .connect()
//   .then(() => {
//     console.log("Connected to PostgreSQL database");
//   })
//   .catch((err) => console.error("Error connecting to PostgreSQL database", err))
//   .finally(() => client.end());

// module.exports = {
//   client,
// };

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
