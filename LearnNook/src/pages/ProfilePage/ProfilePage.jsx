import React, { useState, useEffect } from "react";
import MyProfile from "../../components/Profile/MyProfile";
import CreateProfileForm from "../../components/Profile/CreateProfileForm";
import { getProfileByToken } from "../../utilities/profile/profile-service";
import ProfileActions from "../../components/Profile/ProfileActions";

export default function ProfilePage() {
  const [showCreateProfileForm, setShowCreateProfileForm] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfileByToken(token)
        .then((data) => {
          if (data) {
            setProfile(data);
          } else {
            setShowCreateProfileForm(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleOpenCreateProfileForm = () => {
    setShowCreateProfileForm(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-gray-100 rounded p-4 shadow-md">
        {profile && <MyProfile />}
        {showCreateProfileForm && (
          <button
            onClick={handleOpenCreateProfileForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Profile
          </button>
        )}
        <ProfileActions />
        {!profile && !showCreateProfileForm && (
          <div>
            No profile found.{" "}
            <button
              onClick={handleOpenCreateProfileForm}
              className="text-blue-500 underline"
            >
              Create Profile
            </button>
          </div>
        )}
        {showCreateProfileForm && !profile && <CreateProfileForm />}
      </div>
    </div>
  );
}
