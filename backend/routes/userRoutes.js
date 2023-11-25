const express = require("express");
const {
  allUsers,
  authUser,
  registerUser,
  updateUser,
  deleteUser,
  registeredQuizzes,
  unregisteredQuizzes,
  history,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/").get(protect, allUsers);
// router.route("/").get(allUsers);
router.post("/login", authUser);
router.put("/update", updateUser);
router.put("/regquizzes", registeredQuizzes);
router.put("/unregquizzes", unregisteredQuizzes);
router.delete("/delete", deleteUser);
router.put("/history", history);

module.exports = router;

// https://8000/api/user/register
