import React, { Component } from "react";
import "./SignUpForm.css";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import propTypes from "prop-types";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.password,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { error, email, name, password, confirm } = this.state;
    const disable =
      password !== confirm || !name || !email || !password || !confirm;
    return (
      <>
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
            <form onSubmit={this.handleSubmit}>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  className={`border ${
                    !email ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500`}
                  placeholder={error ? error : "Your email"}
                  required
                />
                {!email && (
                  <p className="mt-1 text-sm text-red-500">Email is required</p>
                )}
              </div>
              {/* Error Message */}
              {error && (
                <p className="mt-2 text-center text-red-600">{error}</p>
              )}

              <div className="mb-6">
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
                  onChange={this.handleChange}
                  className={`border ${
                    !password ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500`}
                  placeholder="Your password"
                  required
                />
                {!password && (
                  <p className="mt-1 text-sm text-red-500">
                    Password is required
                  </p>
                )}
              </div>
              <div className="mb-6">
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
                  onChange={this.handleChange}
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
              <div>{this.state.msg && <p>{this.state.msg}</p>}</div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

SignUpForm.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  error: propTypes.object.isRequired,
  history: propTypes.object.isRequired, // Ensure history is passed as a prop
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.error,
});

export default connect(mapStateToProps, { registerUser })(SignUpForm);
