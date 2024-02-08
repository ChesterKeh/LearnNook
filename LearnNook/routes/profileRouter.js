const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.getAllProfiles);

router.post("/create", profileController.authenticateProfile);

router.get("/:id", profileController.getProfileById);

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
