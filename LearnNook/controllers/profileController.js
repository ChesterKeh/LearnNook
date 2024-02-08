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

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;
    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      // If no profile exists, proceed to updateProfile to create a new profile
      return next();
    }
    req.profile = profile;
    next();
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { handle, company, website, location, status, bio, skills } =
      req.body;
    const profileFields = {
      user: req.user.id,
      handle,
      company,
      website,
      location,
      status,
      bio,
      skills: typeof skills !== "undefined" ? skills.split(",") : undefined,
    };

    let profile = req.profile; // Get profile from request object

    if (!profile) {
      // If no profile exists, create a new profile
      profile = new Profile(profileFields);
      await profile.save();
      return res
        .status(201)
        .json({ success: true, message: "New profile created", profile });
    }

    // Update existing profile
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Profile updated", profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  getAll,
  updateProfile,
  authenticateUser,
};
