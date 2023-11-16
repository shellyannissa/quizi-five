const express = require("express");

const {
  addQuestion,
  allQuestions,
  activateQuestion,
  deleteQuestion,
  endQuestion,
  updateCrctOption,
} = require("../controllers/questionController");

const router = express.Router();

router.route("/add").post(addQuestion);
router.route("/").get(allQuestions);
router.route("/activate").put(activateQuestion);
router.route("/delete").delete(deleteQuestion);
router.route("/end").put(endQuestion);
router.route("/crct").put(updateCrctOption);

module.exports = router;
