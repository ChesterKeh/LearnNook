import { Route, Routes } from "react-router-dom";
import React from "react";
import Homepage from "./pages/MainPage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Navbar from "./components/NavBar/NavBar";
import ProfileListPage from "./pages/ProfileListPage/ProfileListPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="*"
          element={<Homepage />}
        />
        <Route
          path="/list"
          element={<ProfileListPage />}
        />
        <Route
          path="/signup"
          element={<AuthPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Routes>
    </>
  );
}

export default App;
