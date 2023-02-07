import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import IconTile from "./IconTile";
import IconProfile from "../assets/svg/profile.svg";
import IconWorkout from "../assets/svg/workout.svg";
import IconHistory from "../assets/svg/history.svg";
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
      <IconTile src={IconExercises} path="/" title="Exercises" />
    </div>
  );
}
