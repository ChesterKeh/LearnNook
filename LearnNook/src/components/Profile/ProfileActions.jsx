import React from "react";
import { Link } from "react-router-dom";
import DeleteProfileButton from "../Logout/deleteButton";

export default function ProfileActions() {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
      <Link
        to="/edit-profile"
        className="btn btn-light flex items-center"
      >
        <i className="fas fa-user-circle text-info mr-1" /> 🖊️ Edit Profile
      </Link>
      <Link
        to="/add-experience"
        className="btn btn-light flex items-center"
      >
        <i className="fab fa-black-tie text-info mr-1" /> 💼 Add Experience
      </Link>
      <DeleteProfileButton />
    </div>
  );
}
