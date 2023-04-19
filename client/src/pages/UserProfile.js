import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Avatar from "../assets/png/arni.png";
import Button from "../components/Buttons/Button";
import { convertMsToHM } from "../utils/time";
import {
  getItemFromLocalstorage,
  getTokenFromLocalStorage,
} from "../utils/localStorage";

const UserProfile = () => {
  const { logOut } = useContext(UserContext);
  const [userObj] = useState(getItemFromLocalstorage("userInfo"));
  const [lastWorkoutDate, setLastWorkoutDate] = useState();
  const navigate = useNavigate();

  const getAllWorkoutTimeSpent = useMemo(
    () =>
      convertMsToHM(
        userObj?.workoutsArr?.reduce((acc, cur) => acc + cur.timeSpent, 0)
      ),
    [userObj]
  );

  const verify = async () => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await fetch("/verify", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      const json = await response.json();
      console.log(json);

      // if (json.status !== "ok") {
      //   console.log("wrong token");
      //   navigate("/login");
      // }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const lastWorkoutDate = userObj.workoutsArr.slice(-1)[0]?.date;
    setLastWorkoutDate(lastWorkoutDate);
    verify();
  }, []);

  return (
    <div className="user-profile">
      <h1>Profile</h1>
      <div className="user-profile__name-wrapper">
        <img alt="avatar" className="user-profile__avatar" src={Avatar} />
        <div className="user-profile__name">
          <p>Hi {userObj && userObj.name}</p>
          <p>{userObj?.workoutsArr?.length} workouts</p>
          <p>Last workout: {lastWorkoutDate}</p>
          <p>Time spent on the gym {getAllWorkoutTimeSpent} in total</p>
        </div>
      </div>
      <Button onClick={logOut} title="LogOut" name="LogOut">
        LogOut
      </Button>
    </div>
  );
};

export default UserProfile;
