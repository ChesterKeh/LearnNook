const Profile = require("../models/profileModel");

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
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ noprofile: "There is no profile" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAll,
  FindUser,
};
