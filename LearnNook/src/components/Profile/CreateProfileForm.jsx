import React, { useState } from "react";
import { createProfile } from "../../utilities/profile/profile-service";
import { useNavigate } from "react-router-dom";

const CreateProfileForm = () => {
  const [formData, setFormData] = useState({
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    sport: "",
    bio: "",
    experience: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProfile = await createProfile(formData);

      console.log("New Profile:", newProfile);
      navigate("/profile");
      window.location.reload();
      // Handle successful profile creation, e.g., show success message or redirect
    } catch (error) {
      console.error("Error creating profile:", error.message);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Handle:</label>
          <input
            type="text"
            name="handle"
            value={formData.handle}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Sport:</label>
          <input
            type="text"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Experience:</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfileForm;
