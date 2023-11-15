const express = require("express");
const {
  createQuiz,
  allQuizzes,
  updateAllQuizStatus,
  deleteQuiz,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(createQuiz);
router.route("/").get(allQuizzes);
router.route("/status").put(updateAllQuizStatus);
router.route("/delete").delete(deleteQuiz);

module.exports = router;
