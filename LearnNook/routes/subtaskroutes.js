var express = require("express");
var router = express.router;

const subtaskcontroller = require("../controllers/subtaskcontroller");

require.psot("/api/task/:id/subtask", subtaskcontroller.create);

module.exports = router;
