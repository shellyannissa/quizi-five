const express = require("express");
const cors = require("cors");
const app = express();
const cors = require("cors");
require("dotenv").config();

const {
  createUsersTable,
  tempModifications,
} = require("./database/tableCreation");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quizRoutes = require("./routes/quizRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const questionRoutes = require("./routes/questionRoutes");
const optionRoutes = require("./routes/optionRoutes");
const answerRoutes = require("./routes/answerRoutes");

// !Middleware setup
app.use(express.json());
app.use(cors());

// *Currently commented as tables have already been created
// createUsersTable();
// tempModifications();

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/reg", registrationRoutes);
app.use("/api/ques", questionRoutes);
app.use("/api/option", optionRoutes);
app.use("/api/ans", answerRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
