import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="text-white text-xl font-bold"
        >
          Homepage
        </NavLink>
        <div className="flex space-x-4">
          <NavLink
            to="/signup"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Login
          </NavLink>
          <NavLink
            to="/profile"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
