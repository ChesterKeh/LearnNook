import React, { useState } from "react";
import "./SignUpForm.css";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SignUpForm = ({ registerUser, errors }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { name, email, password, confirm } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      // Handle password mismatch error
      return;
    }

    const newUser = {
      name,
      email,
      password,
      confirm,
    };
    registerUser(newUser, navigate);
  };

  const disable =
    password !== confirm || !name || !email || !password || !confirm;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className={`border ${
                !name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500`}
              placeholder="Your name"
              required
            />
            {!name && (
              <p className="mt-1 text-sm text-red-500">Name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`border ${
                !email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500`}
              placeholder="Your email"
              required
            />
            {!email && (
              <p className="mt-1 text-sm text-red-500">Email is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={`border ${
                !password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500`}
              placeholder="Your password"
              required
            />
            {!password && (
              <p className="mt-1 text-sm text-red-500">Password is required</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              value={confirm}
              onChange={handleChange}
              className={`border ${
                !confirm ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500`}
              placeholder="Confirm your password"
              required
            />
            {!confirm && (
              <p className="mt-1 text-sm text-red-500">
                Confirmation is required
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={disable}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <a
              href="#"
              className="text-gray-600 text-sm"
            >
              Already have an account? Sign In
            </a>
          </div>
          {errors && <p className="mt-2 text-center text-red-600">{errors}</p>}
        </form>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  errors: state.auth.error,
});

export default connect(mapStateToProps, { registerUser })(SignUpForm);
