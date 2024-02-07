const express = require("express");
const router = express.Router(); 
const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/user/", userController.getUser);

module.exports = router;
