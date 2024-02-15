import React, { useState, useEffect } from "react";
import { getAllProfiles } from "../../utilities/profile/profile-service";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilesData = await getAllProfiles();
        setProfiles(profilesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const totalPages = Math.ceil(profiles.length / profilesPerPage);
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (profiles.length === 0) {
    return <div>No profiles found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">All Profiles</h2>
      {currentProfiles.map((profile) => (
        <div
          key={profile._id}
          className="bg-white shadow-md rounded-lg mb-4 p-6"
        >
          <div className="flex items-center mb-4">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold">{profile.handle}</h3>
              <p className="text-gray-600">
                <strong>Sport:</strong> {profile.sport}
              </p>
              <p className="text-gray-600">
                <strong>Company:</strong> {profile.company}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {profile.location}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button
          className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>
        <span className="text-xl">
          {currentPage} of {totalPages}
        </span>
        <button
          className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${
            indexOfLastProfile >= profiles.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={nextPage}
          disabled={indexOfLastProfile >= profiles.length}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default ProfileList;
