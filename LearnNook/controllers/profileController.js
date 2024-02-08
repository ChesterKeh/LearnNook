const Profile = require("../models/profileModel");
const jwt = require("jsonwebtoken");

const authenticateProfile = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = decoded.user;

    const userId = user._id;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ error: "User Not found" });
    }
    req.profile;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const createProfile = async (req, res) => {
  try {
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      bio,
      experience,
    } = req.body;

    const profileFields = {
      user: req.user.id,
      handle,
      company,
      website,
      location,
      status,
      skills: skills.split(",").map((skill) => skill.trim()),
      bio,
      experience,
    };

    const profile = new Profile(profileFields);
    await profile.save();
    res
      .status(201)
      .json({ success: true, message: "Profile created", profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json({ profiles });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to get a single profile by ID
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to update a profile by ID
const updateProfileById = async (req, res) => {
  try {
    const {
      handle,
      company,
      website,
      location,
      status,
      skills,
      bio,
      experience,
    } = req.body;
    const profileFields = {
      handle,
      company,
      website,
      location,
      status,
      skills: skills.split(",").map((skill) => skill.trim()),
      bio,
      experience,
    };

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      profileFields,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile updated", profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to delete a profile by ID
const deleteProfileById = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({ success: true, message: "Profile deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  createProfile,
  authenticateProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
};
