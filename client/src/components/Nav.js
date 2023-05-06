import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import IconTile from "./IconTile";
import IconProfile from "../assets/png/user.png";
import IconWorkout from "../assets/png/dumbbell.png";
import IconHistory from "../assets/png/chart.png";
import { getUserInfoFromLocalStorage } from "../utils/localStorage";

export default function Nav() {
  const { setUserObj } = useContext(UserContext);

  useEffect(() => {
    const userInfo = getUserInfoFromLocalStorage();

    if (userInfo) {
      setUserObj(userInfo);
    }
  }, []);
  return (
    <div className="nav">
      <IconTile src={IconProfile} path="/user-profile" title="Profile" />
      <IconTile src={IconWorkout} path="/workout-page" title="Workout" />
      <IconTile src={IconHistory} path="/workout-history" title="History" />
    </div>
  );
}
