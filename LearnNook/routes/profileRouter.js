const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.FindUser);
router.get("/getAll", profileController.getAll);

module.exports = router;
