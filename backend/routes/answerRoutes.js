const express = require("express");

const { addAnswer, allAnswers } = require("../controllers/answerController");

const router = express.Router();

router.route("/add").post(addAnswer);
router.route("/").get(allAnswers);

module.exports = router;
