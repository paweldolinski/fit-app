import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Home from "./pages/Home";
import Nav from "./components/nav";
import SearchFood from "./pages/SearchFood";
import Workout from "./pages/Workout";
import UserContext from "./context/userContext";

const context = React.createContext(UserContext);

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/search" element={<SearchFood />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
