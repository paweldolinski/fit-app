import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userObj] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const navigate = useNavigate();

  const verify = async () => {
    const token = localStorage.getItem("token");
    console.log("verify");

    const response = await fetch("http://localhost:5000/verify", {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    });

    const json = await response.json();

    if (json.status !== "ok") {
      console.log("wrong token");
      navigate("/login");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="register">
      <h1>UserProfile</h1>
      <h2>Welcome: {userObj && userObj.name}</h2>
    </div>
  );
};

export default UserProfile;
