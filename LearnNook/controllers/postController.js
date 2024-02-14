const Post = require("../models/postModel");

const getAll = async (req, res) => {
  try {
    const tasks = await Post.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
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
module.exports = {
  getAll,
  newPost,
};
