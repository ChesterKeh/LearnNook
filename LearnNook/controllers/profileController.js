const Profile = require("../models/profileModel");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json({ profiles });
  }
};

const FindUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ noprofile: "There is no profile" });
    }
    res.json(profile);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error });
  }
  console.log("User ID:", req.user.id);
};

module.exports = {
  getAll,
  FindUser,
};
