const express = require("express");
const {
  createQuiz,
  allQuizzes,
  updateAllQuizStatus,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(createQuiz);
router.route("/").get(allQuizzes);
router.route("/status").put(updateAllQuizStatus);

module.exports = router;
