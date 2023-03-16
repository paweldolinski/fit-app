import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../components/Back";
import { UserContext } from "../context/userContext";
import Avatar from "../assets/png/arni.png";
import Button from "../components/Button";

const UserProfile = () => {
  const { logOut } = useContext(UserContext);
  const [userObj] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const navigate = useNavigate();

  const verify = async () => {
    const token = localStorage.getItem("token");
    console.log("verify");

    const response = await fetch("/verify", {
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
    <div className="user-profile">
      <Back />
      <h1>Profile</h1>
      <div className="user-profile__name-wrapper">
        <img className="user-profile__avatar" src={Avatar} />
        <div className="user-profile__name">
          <p>{userObj && userObj.name}</p>
          <p>{userObj.workoutsArr.length} workouts</p>
        </div>
      </div>
      <Button onClick={logOut} title="LogOut" name="LogOut">
        LogOut
      </Button>
    </div>
  );
};

export default UserProfile;
