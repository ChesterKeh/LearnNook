require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const postRouter = require("./routes/postRouter");
const server = express();

// Middleware block
server.use(express.json());
server.use(express.static(path.join(__dirname, "dist")));

// Routes block
server.use("/api/users", userRouter);
server.use("/api/profile", profileRouter);
server.use("/api/post", postRouter);

// Serve the index.html file for all other routes
server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Listen block
const port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
