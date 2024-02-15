import React, { useState, useEffect } from "react";
import { getProfileByToken } from "../../utilities/profile/profile-service";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    getProfileByToken(token)
      .then((data) => {
        // Assuming the response directly contains the profile object
        setProfile(data); // Adjusted based on the provided response structure
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Could not fetch profile.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No profile found</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md mb-4">
        <div className="flex items-center mb-4">
          {/* Assuming avatar URL needs to be fully qualified or handled if relative */}
          {profile.user.avatar && (
            <img
              src={profile.user.avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div>
            <h3 className="text-lg font-bold">{profile.handle}</h3>
            <p>
              <strong>Company:</strong> {profile.company}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.website}
              </a>
            </p>
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
            <p>
              <strong>Status:</strong> {profile.status}
            </p>
            <p>
              <strong>Sport:</strong> {profile.sport.join(", ")}
            </p>
          </div>
        </div>
        <p className="font-semibold">Bio:</p>
        <p>{profile.bio}</p>
        {/* If you want to display experiences and ensure it exists and is an array */}
        {profile.experience && profile.experience.length > 0 && (
          <div>
            <h4 className="font-bold">Experience</h4>
            {profile.experience.map((exp, index) => (
              <div key={index}>
                <p>
                  {exp.title} at {exp.company}
                </p>
                {/* Add more experience details as needed */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
