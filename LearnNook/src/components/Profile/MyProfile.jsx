import React, { useState, useEffect } from "react";
import { getProfileById } from "../../utilities/profile/profile-service";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        // Fetch profile using the token
        const userProfile = await getProfileById(token);
        console.log("User Profile:", userProfile);

        // Set the profile state and update loading state
        setProfile(userProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
        setError(error.message); // Set error state to display error message
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md mb-4">
        <div className="flex items-center mb-4">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div>
            <h3 className="text-lg font-bold">{profile.handle}</h3>
            <p>
              <strong>Sport:</strong> {profile.sport.join(", ")}{" "}
              {/* Join array elements */}
            </p>
            <p>
              <strong>Company:</strong> {profile.company}
            </p>
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
          </div>
        </div>
        <p className="font-semibold">Bio:</p>
        <p>{profile.bio}</p>
      </div>
    </div>
  );
};

export default MyProfile;
