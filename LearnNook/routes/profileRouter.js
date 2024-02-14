const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authenticateProfile = require("../middleware/authenticateProfile");

router.get("/all", profileController.getAllProfiles);

router.post("/create", authenticateProfile, profileController.createProfile);

router.get("/handle/:handle", profileController.getProfileByHandle);

router.get("/:user_id", profileController.getProfileById);

router.post(
  "/experience/:user_id",
  authenticateProfile,
  profileController.createExperience
);

router.put("/:id", authenticateProfile, profileController.updateProfileById);

// Delete a profile by ID
router.delete("/:id", authenticateProfile, profileController.deleteProfileById);
router.delete(
  "/experience/:exp_id",
  authenticateProfile,
  profileController.deleteExpbyId
);

module.exports = router;
