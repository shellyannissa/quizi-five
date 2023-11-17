const express = require("express");

const {
  addAnswer,
  allAnswers,
  detailedAnswers,
} = require("../controllers/answerController");

const router = express.Router();

router.route("/add").post(addAnswer);
router.route("/").get(allAnswers);
router.route("/det").get(detailedAnswers);

module.exports = router;
