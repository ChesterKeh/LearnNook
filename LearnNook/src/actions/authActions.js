import axios from "axios";
import * as jwt_decode from "jwt-decode";
import setAuthToken from "../utilities/setAuthToken/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, navigate) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      navigate("/login");
    })
    .catch((error) => {
      if (error.response) {
        console.error("Registration error:", error.response.data);
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        if (error.response.status === 400) {
          dispatch({
            type: GET_ERRORS,
            payload: { message: "Email already in use" }, // Dispatch error message
          });
        }
      } else {
        console.error("Error during registration:", error.message);
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Unable to connect to the server." },
        });
      }
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded)); // Pass decoded token to setCurrentUser
    })
    .catch((error) => {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
      console.error("Error during login:", error.message);
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
