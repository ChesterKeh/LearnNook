const Post = require("../models/postModel");
const Profile = require("../models/profileModel");

const getAll = async (req, res) => {
  try {
    const tasks = await Post.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPostbyId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ nopostfound: "No post found" });
  }
};

const newPost = async (req, res) => {
  try {
    const { text, name, avatar } = req.body;
    const userId = req.user._id;

    // Create a new post instance
    const post = new Post({
      text,
      name,
      avatar,
      user: userId,
    });

    // Save the post to the database
    await post.save();

    // Send a response indicating successful creation of the post
    res.status(201).json({ success: true, post });
  } catch (error) {
    // Handle any errors that occur during post creation
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "User not authorized" });
    }

    await post.remove();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const likePost = async (req, res) => {
  try {
    const userWhoLiked = req.user._id; // Get the ID of the user who liked the post
    const postId = req.params.id; // Get the ID of the post

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    const alreadyLiked = post.likes.some(
      (like) => like.user.toString() === userWhoLiked
    );
    if (alreadyLiked) {
      return res
        .status(400)
        .json({ alreadyLiked: "User already liked this post" });
    }

    // Add the user who liked the post to the likes array
    post.likes.unshift({ user: userWhoLiked });
    await post.save();

    // Send back the updated post
    res.json(post);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const dislikePost = async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already disliked the post
    if (!post.likes.some((like) => like.user.toString() === req.user._id)) {
      return res.status(400).json({ error: "User has not liked the post" });
    }

    // Remove the like
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user._id
    );

    // Save the post with updated likes
    await post.save();

    // Send success response
    res.json({ success: true, post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id,
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Find the index of the comment to remove
    const removeIndex = post.comments.findIndex(
      (comment) => comment.id === req.params.comment_id
    );

    // Check if the comment exists
    if (removeIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the authenticated user is the owner of the comment
    if (post.comments[removeIndex].user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: "User not authorized to remove this comment" });
    }

    // Remove the comment from the post
    post.comments.splice(removeIndex, 1);

    // Save the updated post
    await post.save();

    // Send a success response
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  getAll,
  newPost,
  getPostbyId,
  deletePost,
  likePost,
  dislikePost,
  addComment,
  removeComment,
};
