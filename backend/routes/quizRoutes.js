const express = require("express");
const {
  createQuiz,
  allQuizzes,
  updateAllQuizStatus,
  deleteQuiz,
  terminateQuiz,
  quizQuestions,
  editQuiz,
  getQnsandOptions,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/create").post(createQuiz);
router.route("/edit").put(editQuiz);
router.route("/").get(allQuizzes);
router.route("/status").put(updateAllQuizStatus);
router.route("/delete").delete(deleteQuiz);
router.route("/terminate").put(terminateQuiz);
router.route("/getqns").put(quizQuestions);
router.route("/qnopns").put(getQnsandOptions);

module.exports = router;
