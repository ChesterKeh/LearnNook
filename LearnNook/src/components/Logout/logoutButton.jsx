import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../utilities/user/user-service";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white hover:text-gray-300 transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
