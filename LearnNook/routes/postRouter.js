const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateProfile = require("../middleware/authenticateProfile");

router.post("/", authenticateProfile, postController.newPost);

module.exports = router;
