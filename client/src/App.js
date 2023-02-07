import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import WelcomePage from "./pages/WelcomePage";
import Nav from "./components/Nav";
import Workout from "./pages/Workout";
import WorkoutHistory from "./pages/WorkoutHistory";
import FinishedWorkout from "./pages/FinishedWorkout";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Tutorial from "./components/Tutorial";
import { UserContext } from "./context/userContext";

const App = () => {
  const { isNewUser } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoutes>
              <div className="wrapper">
                <UserProfile />
                <Nav />
              </div>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/workout"
          element={
            <div className="wrapper">
              <ProtectedRoutes>
                {isNewUser ? (
                  <Tutorial />
                ) : (
                  <>
                    <Workout />
                    <Nav />
                  </>
                )}
              </ProtectedRoutes>
            </div>
          }
        />
        <Route
          path="/workout-history"
          element={
            <ProtectedRoutes>
              <WorkoutHistory />
              <Nav />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/finished-workout"
          element={
            <ProtectedRoutes>
              <FinishedWorkout />
              <Nav />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
