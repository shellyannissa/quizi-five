const express = require("express");
const {
  allUsers,
  authUser,
  registerUser,
  updateUser,
} = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
// router.route("/").get(protect, allUsers);
router.route("/").get(allUsers);
router.post("/login", authUser);
router.put("/update", updateUser);

module.exports = router;
