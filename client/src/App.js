import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Home from "./pages/Home";
import Nav from "./components/nav";
import Workout from "./pages/Workout";
import WorkoutHistory from "./pages/WorkoutHistory";
import UserProfile from "./pages/UserProfile";
import { UserContext } from "./context/userContext";

const App = () => {
  const { isLoggedIn, setIsLoggedIn, setUserObj } = useContext(UserContext);
  console.log(isLoggedIn);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //
  //   if (userInfo) {
  //     setIsLoggedIn(true);
  //     setUserObj(userInfo);
  //   }
  // }, []);
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/userProfile"
          element={isLoggedIn ? <UserProfile /> : <Login />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <UserProfile /> : <Login />}
        />
        <Route path="/register" element={<SignUp />} />
        <Route path="/workout" element={<Workout />} />
        <Route
          path="/workout-history"
          element={isLoggedIn ? <WorkoutHistory /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
