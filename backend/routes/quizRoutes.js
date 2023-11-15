const express = require("express");
const {
  createQuiz,
  allQuizzes,
  updateAllQuizStatus,
  deleteQuiz,
  terminateQuiz,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(createQuiz);
router.route("/").get(allQuizzes);
router.route("/status").put(updateAllQuizStatus);
router.route("/delete").delete(deleteQuiz);
router.route("/terminate").put(terminateQuiz);

module.exports = router;
