const Profile = require("../models/profileModel");
const jwt = require("jsonwebtoken");

//check if token has a profile
// if there is no profile
// generates a profile

const createProfile = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    const {
      user,
      handle,
      company,
      website,
      location,
      status,
      sport,
      bio,
      experience,
    } = req.body;

    // Check if the handle already exists
    const existingProfile = await Profile.findOne({ handle });
    if (existingProfile) {
      return res
        .status(400)
        .json({ error: "Handle already exists. Try another one." });
    }

    console.log("User ID:", req.user._id);

    // Create a new profile object
    const newProfile = new Profile({
      user: req.user._id,
      handle,
      company,
      website,
      location,
      status,
      sport: sport.split(",").map((skill) => skill.trim()),
      bio,
      experience,
    });

    console.log("New Profile:", newProfile);

    // Save the new profile to the database
    await newProfile.save();

    console.log("New Profile saved:", newProfile);

    // Return a success response with the newly created profile
    res.status(201).json({ success: true, profile: newProfile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(200).json({ profiles });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to get a single profile by ID
const getProfileByHandle = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["name", "avatar"]);
    console.log(profile);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Controller function to get a single profile by ID
const getProfileById = async (req, res) => {
  try {
    // Use req.user information decoded from the token to fetch the profile
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//Controller function for experince

const createExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
    };

    profile.experience.unshift(newExp);
    await profile.save();
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
      sport,
      bio,
      experience,
    } = req.body;

    const profileFields = {
      handle,
      company,
      website,
      location,
      status,
      sport: sport.split(",").map((skill) => skill.trim()),
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
    const profileId = req.params.id;

    // Find and delete the profile by its ID
    const profile = await Profile.findByIdAndDelete(profileId);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Respond with success message
    res.json({ success: true, message: "Profile deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const deleteExpbyId = async (req, res) => {
  try {
    const experienceId = req.params.exp_id;

    // Find the profile containing the experience with the given ID
    const profile = await Profile.findOne({ "experience._id": experienceId });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Find the index of the experience to delete
    const removeIndex = profile.experience.findIndex(
      (exp) => exp._id.toString() === experienceId
    );

    if (removeIndex === -1) {
      return res.status(404).json({ error: "Experience not found" });
    }

    // Remove the experience from the profile's experience array
    profile.experience.splice(removeIndex, 1);

    // Save the profile with the updated experience list
    await profile.save();

    // Respond with success message
    res.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  getProfileByHandle,
  createExperience,
  deleteExpbyId,
  deleteProfileById,
};
