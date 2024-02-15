import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import Homepage from "./pages/MainPage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Navbar from "./components/NavBar/NavBar";
import ProfileListPage from "./pages/ProfileListPage/ProfileListPage";
import "./App.css";
import SignUpPage from "./pages/AuthPage/SignupPage/SignUpPage";
import LoginPage from "./pages/AuthPage/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/dashboard/dashboard";
import PostsPage from "./pages/PostPage/PostPage";
import EditProfile from "./components/Profile/EditProfile";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/list"
          element={<ProfileListPage />}
        />
        <Route
          path="/signup"
          element={<SignUpPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/post"
          element={<PostsPage />}
        />
        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;
