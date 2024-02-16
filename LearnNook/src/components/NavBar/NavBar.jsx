import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import LogoutButton from "../Logout/logoutButton";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize isLoggedIn with false

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("token");
    setIsLoggedIn(isLoggedIn); // Update isLoggedIn based on the presence of the token
  }, [localStorage.getItem("token")]);

  const publicDisplay = (
    <>
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
    </>
  );

  const logDisplay = (
    <>
      <NavLink
        to="/profile"
        className="text-white hover:text-gray-300 transition duration-300"
      >
        Profile
      </NavLink>
      <LogoutButton />
    </>
  );

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className="text-white text-xl font-bold"
          >
            LearnNook
          </NavLink>
          <NavLink
            to="/list"
            className="text-white text-xl font-bold"
          >
            Coach List
          </NavLink>
          <NavLink
            to="/post"
            className="text-white text-xl font-bold"
          >
            The Feed
          </NavLink>
        </div>
        <div className="flex space-x-4">
          {isLoggedIn ? logDisplay : publicDisplay}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
