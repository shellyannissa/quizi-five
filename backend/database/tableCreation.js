const pool = require("./db");
const { addMinutesAndSeconds, convertUTCToIST } = require("./utilities");

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
      uid UUID REFERENCES "User"(uId) ON DELETE CASCADE,
      quizId UUID REFERENCES "Quiz"(quizId) ON DELETE CASCADE,
      points INTEGER,
      position INTEGER
    );`;

    await client.query(registrationQuery);

    const questionQuery = `
      CREATE TABLE IF NOT EXISTS "Question" (
        questionId UUID PRIMARY KEY,
        quizId UUID REFERENCES "Quiz"(quizId),
        weightage INT,
        startedInstant TIMESTAMP,
        endingInstant TIMESTAMP,
        alottedMin INT,
        alottedSec INT,
        started BOOLEAN,
        description VARCHAR(255),
        correctOptionId UUID 
        );`;

    await client.query(questionQuery);

    const answerQuery = `
      CREATE TABLE IF NOT EXISTS "Answer" (
        uid UUID REFERENCES "User"(uId) ON DELETE CASCADE,
        questionId UUID REFERENCES "Question"(questionId) ON DELETE CASCADE,
        quizId UUID REFERENCES "Quiz"(quizId) ON DELETE CASCADE,
        optionId UUID ,
        answeredInstant TIME);`;

    await client.query(answerQuery);
    const optionQuery = `
    CREATE TABLE IF NOT EXISTS "Option" (
      optionId UUID PRIMARY KEY,
      questionId UUID REFERENCES "Question"(questionId) ON DELETE CASCADE,
      quizId UUID REFERENCES "Quiz"(quizId) ON DELETE CASCADE,
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

    cosnt foreignKeyQuery3 = `
        ALTER TABLE "Answer"
        ADD CONSTRAINT fk_answer_user
        FOREIGN KEY (uid)
        REFERENCES "User" (uId)
        ON DELETE CASCADE;


        ALTER TABLE "Answer"
        ADD CONSTRAINT fk_answer_question
        FOREIGN KEY (questionId)
        REFERENCES "Question" (questionId)
        ON DELETE CASCADE;


        ALTER TABLE "Answer"
        ADD CONSTRAINT fk_answer_quiz
        FOREIGN KEY (quizId)
        REFERENCES "Quiz" (quizId)
        ON DELETE CASCADE;

        ALTER TABLE "Option"
        ADD CONSTRAINT fk_option_question
        FOREIGN KEY (questionId)
        REFERENCES "Question" (questionId)
        ON DELETE CASCADE;

        ALTER TABLE "Option"
        ADD CONSTRAINT fk_option_quiz
        FOREIGN KEY (quizId)
        REFERENCES "Quiz" (quizId)
        ON DELETE CASCADE;


        ALTER TABLE "Question"
        ADD CONSTRAINT fk_question_quiz
        FOREIGN KEY (quizId)
        REFERENCES "Quiz" (quizId)
        ON DELETE CASCADE;

        
    ALTER TABLE "Registration"
    ADD CONSTRAINT fk_registration_quiz
    FOREIGN KEY (quizId)
    REFERENCES "Quiz" (quizId)
    ON DELETE CASCADE;

        `;
        await client.query(foreignKeyQuery3);
  */

    client.release();

    console.log("All tables created successfully");
  } catch (err) {
    console.error(err.message);
  }
};

const tempModifications = async () => {
  try {
    const client = await pool.connect();

    const query = `

    
      `;

    const ans = await client.query(query);

    console.log(ans);

    client.release();
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { createUsersTable, tempModifications };
