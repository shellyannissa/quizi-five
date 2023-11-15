const express = require("express");

const {
  registerQuiz,
  allRegistrations,
  quizRegistrations,
  unRegister,
} = require("../controllers/registrationController");

const router = express.Router();
router.route("/register").post(registerQuiz);
//! .patch is used since get cannot be used as parameter is passed
router.route("/regs").patch(quizRegistrations);
router.route("/allreg").get(allRegistrations);
router.route("/unregister").delete(unRegister);

module.exports = router;
