import React, { useState, useEffect } from "react";
import * as profileService from "../../utilities/profile/profile-service";

const DeleteProfileButton = () => {
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        if (!token) {
          console.error("No token found. User is not logged in.");
          return;
        }
        const profile = await profileService.getProfileByToken(token);
        setProfileId(profile._id); // Ensure your profile object structure has an _id field
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async () => {
    try {
      if (!profileId) {
        console.error("No profile ID found. Cannot delete profile.");
        return;
      }
      await profileService.deleteProfile(profileId);
      console.log("Profile deleted successfully.");
      // Here, you might want to redirect the user or update the state to reflect the deletion
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={!profileId}
      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 disabled:bg-red-300"
    >
      Delete Profile
    </button>
  );
};

export default DeleteProfileButton;
