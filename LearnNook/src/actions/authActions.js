import axios from "axios";
import { GET_ERRORS } from "./types";

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
          console.log("Email already in use");
        }
      } else {
        // Handle network error or error without a response
        console.error("Error during registration:", error.message);
        dispatch({
          type: GET_ERRORS,
          payload: { message: "Unable to connect to the server." },
        });
      }
    });
};
