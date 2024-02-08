const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.getAll);
router.get("/getAll", profileController.getAll, (req, res) => {
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
    res.status(200).json({ success: true, message: "Profile fields updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
