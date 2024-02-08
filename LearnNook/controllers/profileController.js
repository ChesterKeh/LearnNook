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
    const { handle, company, website, location, status, bio, skills } =
      req.body;

    // Create or update profile fields
    const profileFields = {
      user: req.user.id, // Assuming you're using authentication middleware to get the user ID
      handle,
      company,
      website,
      location,
      status,
      bio,
      skills: typeof skills !== "undefined" ? skills.split(",") : undefined,
    };

    // Find profile by user ID and update or create if not exists
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // If profile exists, update it
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
    } else {
      // If profile doesn't exist, create it
      profile = new Profile(profileFields);
      await profile.save();
    }

    res.status(200).json({ success: true, message: "Profile fields updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = {
  getAll,
  FindUser,
};

// const FindUser = async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.SECRET);
//     const userId = decoded.userId;
//     const profile = await Profile.findOne({ user: userId });
//     if (!profile) {
//       return res.status(404).json({ noprofile: "There is no profile" });
//     }
//     res.json(profile);
//   } catch (error) {
//     console.error("Database Error:", error);
//     res.status(500).json({ error });
//   }
//   console.log("User ID:", req.user.id);
// };
