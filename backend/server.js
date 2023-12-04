const express = require("express");
const cors = require("cors");
const app = express();
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

const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io ");
  socket.on("setup", (userData) => {
    // socket.join(userData._id);
    console.log(userData);
    socket.emit("connected");
  });

  socket.on("join quiz", (room) => {
    socket.join(room);
    console.log("user joined Room :" + room);
  });

  socket.on("new question", (quizId, activeQn) => {
    console.log("new question recieved on server");
    console.log("quizID", quizId);
    console.log("activeQn", activeQn);
    // socket.to(quizId).emit('new question',activeQn);
  });

  socket.on("leave quiz", (room) => {
    socket.leave(room);
    console.log("user left Room :" + room);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
