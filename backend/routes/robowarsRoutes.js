const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUserRW,
  editUserRW,
  createQuizRW,
} = require("../controllers/robowarsController");

const router = express.Router();

router.route("/createUser").post(registerUserRW);
router.route("/editUser").post(editUserRW);
router.route("/creteQuiz").post(createQuizRW);

module.exports = router;

// https://8000/api/user/register
