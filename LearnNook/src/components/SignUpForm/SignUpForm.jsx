import React, { Component } from "react";
import { signUp } from "../../utilities/user/user-service"
import "./SignUpForm.css";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(this.state);
      if (user) {
        this.props.setUser(user);
      } else {
        this.setState({ error: "Email already in use" });
      }
    } catch (e) {
      const error = JSON.stringify(e);
      this.setState({ error });
      console.log(error);
    }
  };

  render() {
    const { error, email } = this.state;
    const disable = this.state.password !== this.state.confirm;
    const emailErrorClass = error ? "border-red-500" : "";
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
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                  required
                />
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
                  className={`border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 ${emailErrorClass}`}
                  placeholder={error ? error : "Your email"}
                  required
                />
              </div>
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
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Your password"
                  required
                />
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
                  value={this.state.confirm}
                  onChange={this.handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                  placeholder="Confirm your password"
                  required
                />
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

export default SignUpForm;
