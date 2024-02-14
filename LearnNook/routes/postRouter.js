const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticateProfile = require("../middleware/authenticateProfile");

router.post("/", authenticateProfile, postController.newPost);
router.post("/like/:id", authenticateProfile, postController.likePost);
router.post("/dislike/:id", authenticateProfile, postController.dislikePost);
router.post("/:id/comment", authenticateProfile, postController.addComment);

router.get("/getall", postController.getAll);
router.get("/:id", postController.getPostbyId);

router.delete("/remove/:id", authenticateProfile, postController.deletePost);
router.delete(
  "/:id/comment/:comment_id",
  authenticateProfile,
  postController.removeComment
);

module.exports = router;
