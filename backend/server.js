const express = require("express");
const app = express();
require("dotenv").config();

const {
  createUsersTable,
  tempModifications,
} = require("./database/tableCreation");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quizRoutes = require("./routes/quizRoutes");

// !Middleware setup
app.use(express.json());

// *Currently commented as tables have already been created
// createUsersTable();
// tempModifications();

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
