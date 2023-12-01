const express = require("express");
const {
  allAdmins,
  authAdmin,
  registerAdmin,
  updateAdmin,
  adminQuizzes,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerAdmin);

//* Protect middleware as admin is already logged in
// router.route("/").get(protect, allAdmins);
router.route("/").get(allAdmins);
router.post("/login", authAdmin);
router.put("/update", updateAdmin);
router.get("/quizzes", adminQuizzes);

module.exports = router;
