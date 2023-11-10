const pool = require("./db");

const createUsersTable = async () => {
  try {
    const client = await pool.connect();

    const userQuery = `
    CREATE TABLE IF NOT EXISTS "User" (
      uId UUID PRIMARY KEY,
      name VARCHAR(25),
      password VARCHAR(40),
      email VARCHAR(30),
      image VARCHAR(255));
    `;

    await client.query(userQuery);

    const adminQuery = `
    CREATE TABLE IF NOT EXISTS "Admin" (
      adminId UUID PRIMARY KEY,
      name VARCHAR(25),
      password VARCHAR(40),
      email VARCHAR(30),
      noOfQuizzes INT);`;

    await client.query(adminQuery);

    // const enumQuery = `
    // CREATE TYPE STATUS AS ENUM ('upcoming', 'ongoing', 'completed');
    // `;

    // await client.query(enumQuery);

    const quizQuery = `
      CREATE TABLE IF NOT EXISTS "Quiz" (
        quizId UUID PRIMARY KEY,
        name VARCHAR(25),
        image VARCHAR(255),
        eventTime TIMESTAMP,
        status STATUS,
        adminId UUID REFERENCES "Admin"(adminId));  
        `;

    await client.query(quizQuery);

    const registrationQuery = `
    CREATE TABLE  IF NOT EXISTS "Registration"(
      uid UUID REFERENCES "User"(uId),
      quizId UUID REFERENCES "Quiz"(quizId),
      points INTEGER,
      position INTEGER
    );`;

    await client.query(registrationQuery);

    const questionQuery = `
      CREATE TABLE IF NOT EXISTS "Question" (
        questionId UUID PRIMARY KEY,
        quizId UUID REFERENCES "Quiz"(quizId),
        weightage INT,
        allottedTime INT,
        postedInstant TIME,
        description VARCHAR(255),
        correctOptionId UUID );`;

    await client.query(questionQuery);

    const answerQuery = `
      CREATE TABLE IF NOT EXISTS "Answer" (
        uid UUID REFERENCES "User"(uId),
        questionId UUID REFERENCES "Question"(questionId),
        quizId UUID REFERENCES "Quiz"(quizId),
        optionId UUID ,
        answeredInstant TIME);`;

    await client.query(answerQuery);
    const optionQuery = `
    CREATE TABLE IF NOT EXISTS "Option" (
      optionId UUID PRIMARY KEY,
      questionId UUID REFERENCES "Question"(questionId),
      quizId UUID REFERENCES "Quiz"(quizId),
      description VARCHAR(255));`;
    await client.query(optionQuery);

    // * Foreign Key Constraints, commented to prevent reexecution of the same query
    /* 
    const foreignKeyQuery = `
        ALTER TABLE "Question"
        ADD CONSTRAINT fk_Qn_crctOpId
        FOREIGN KEY (correctOptionId)
        REFERENCES "Option" (optionId);
`;
    await client.query(foreignKeyQuery);

    const foreignKeyQuery2 = `
      ALTER TABLE "Answer"
      ADD CONSTRAINT fk_Ans_opId
      FOREIGN KEY (optionId)
      REFERENCES "Option" (optionId);`;

    await client.query(foreignKeyQuery2);

  */

    client.release();

    console.log("All tables created successfully");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { createUsersTable };
