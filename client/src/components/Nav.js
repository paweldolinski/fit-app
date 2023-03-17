import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import IconTile from "./IconTile";
import IconProfile from "../assets/png/user.png";
import IconWorkout from "../assets/png/dumbbell.png";
import IconHistory from "../assets/png/chart.png";
import IconExercises from "../assets/svg/exercises.svg";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, userObj, setUserObj } = useContext(UserContext);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserObj(user);
    }
  }, []);
  return (
    <div className="nav">
      <IconTile src={IconProfile} path="/user-profile" title="Profile" />
      <IconTile src={IconWorkout} path="/workout" title="Workout" />
      <IconTile src={IconHistory} path="/workout-history" title="History" />
    </div>
  );
}
