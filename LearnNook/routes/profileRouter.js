const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// router.post(
//   "/update",
//   profileController.authenticateProfile,
//   profileController.updateProfileById
// );
// router.get("/getAll", profileController.getAllProfiles);

router.post(
  "/",
  profileController.authenticateProfile,
  profileController.createProfile
);

// Get all profiles
router.get("/", profileController.getAllProfiles);

// Get a single profile by ID
router.get("/:id", profileController.getProfileById);

// Update a profile by ID
router.put(
  "/:id",
  profileController.authenticateProfile,
  profileController.updateProfileById
);

// Delete a profile by ID
router.delete(
  "/:id",
  profileController.authenticateProfile,
  profileController.deleteProfileById
);

module.exports = router;
