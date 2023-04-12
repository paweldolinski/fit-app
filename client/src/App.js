import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import WelcomePage from "./pages/WelcomePage";
import Nav from "./components/Nav";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import WorkoutHistory from "./pages/WorkoutHistory";
import FinishedWorkout from "./pages/FinishedWorkout";
import Workout from "./pages/Workout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/user-profile"
            element={
              <>
                <UserProfile />
                <Nav />
              </>
            }
          />
          <Route
            path="/workout"
            element={
              <div className="wrapper">
                <Workout />
                <Nav />
              </div>
            }
          />
          <Route
            path="/workout-history"
            element={
              <>
                <WorkoutHistory />
                <Nav />
              </>
            }
          />
          <Route
            path="/finished-workout"
            element={
              <>
                <FinishedWorkout />
                <Nav />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
