const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post(
  "/update",
  profileController.authenticateUser,
  profileController.updateProfile
);
router.get("/getAll", profileController.getAll);

module.exports = router;
