const express = require("express");
const {
  addOption,
  allOptions,
  deleteOption,
  getOptions,
  count,
} = require("../controllers/optionController");

const router = express.Router();

router.route("/add").post(addOption);
router.route("/").get(allOptions);
router.route("/count").post(count);
router.route("/delete").delete(deleteOption);
router.route("/options").put(getOptions);

module.exports = router;
