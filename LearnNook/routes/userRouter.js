const express = require("express");
const router = express.Router(); // Fix: Change express.router() to express.Router()
const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.post("/create", userController.create);
router.post("/login", userController.login);

router.post("/user/", userController.getUser);

module.exports = router;
