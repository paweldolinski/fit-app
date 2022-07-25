import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Home from "./pages/Home";
import Nav from "./components/nav";
import Workout from "./pages/Workout";
import WorkoutHistory from "./pages/WorkoutHistory";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/workout"
          element={
            <ProtectedRoutes>
              <Workout />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/workout-history"
          element={
            <ProtectedRoutes>
              <WorkoutHistory />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
