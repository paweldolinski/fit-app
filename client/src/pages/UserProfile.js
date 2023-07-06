import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/userContext";
import Avatar from "../assets/png/arni.png";
import Button from "../components/Buttons/Button";
import { convertMsToHM } from "../utils/time";
import {
  getItemFromLocalstorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
  setUserInfoToLocalStorage,
} from "../utils/localStorage";
import Select from "react-select";
import * as React from "react";
import { BestRecordRow } from "../components/userProfile/BestRecordRow";
import AwardIcon from "../assets/svg/award-icon.svg";
import { setExercisesDataArray } from "../utils/setExercisesData";

const selectStyles = {
  clearIndicator: () => ({
    display: "none",
  }),
};

const UserProfile = () => {
  const { logOut } = useContext(UserContext);
  const userObj = getItemFromLocalstorage("userInfo");
  const exercisesData = setExercisesDataArray(userObj.workoutsArr);
  const [lastWorkoutDate, setLastWorkoutDate] = useState();
  const [choseExercises, setChoseExercises] = useState(
    exercisesData.filter(({ label }) => userObj.bestResults.includes(label))
  );
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);

  const removeFromChoseExercise = ({
    target: {
      dataset: { name },
    },
  }) => {
    const bestExercisesArray = choseExercises.filter(
      ({ value }) => value !== name
    );
    setChoseExercises(bestExercisesArray);
  };

  const getAllWorkoutTimeSpent = useMemo(
    () =>
      convertMsToHM(
        userObj?.workoutsArr?.reduce((acc, cur) => acc + cur.timeSpent, 0)
      ),
    [userObj]
  );

  const toggleIsHidden = () => {
    setIsDropdownHidden(!isDropdownHidden);
  };

  const handleBestResultExercises = (exercises) => {
    setChoseExercises(exercises);
  };

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
    } catch (e) {
      console.log(e);
    }
  };

  const updateBestExercisesDb = async () => {
    const token = getTokenFromLocalStorage();
    const userInfo = getUserInfoFromLocalStorage();
    const { name, email, workoutsArr, workoutTemplates, bestResults } =
      userInfo;
    const existingStorage = {
      name,
      email,
      workoutsArr,
      workoutTemplates,
      bestResults,
    };
    const exercises = choseExercises.map((item) => item.label);

    try {
      const response = await fetch("/workout/addToBestResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          exercises,
          email: userObj.email,
        }),
      });

      const json = await response.json();

      if (json) {
        existingStorage.bestResults = exercises;
        setUserInfoToLocalStorage(existingStorage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setWorkoutDate = () =>
    setLastWorkoutDate(userObj.workoutsArr.slice(-1)[0]?.date);

  useEffect(() => {
    setWorkoutDate();
    verify();
  }, []);

  useEffect(() => {
    updateBestExercisesDb();
  }, [choseExercises]);

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
      <div className="user-profile__select-wrapper">
        <img
          alt="icon"
          onClick={toggleIsHidden}
          className="user-profile__best-btn"
          src={AwardIcon}
        />
        <Select
          value={choseExercises}
          options={exercisesData}
          defaultValue={choseExercises}
          placeholder="Choose exercise"
          onChange={handleBestResultExercises}
          className={
            isDropdownHidden
              ? "user-profile__select hidden"
              : "user-profile__select"
          }
          isMulti={true}
          controlShouldRenderValue={false}
          multiValueRemove={false}
          styles={selectStyles}
        />
      </div>

      <div className="best-row">
        {choseExercises?.map(({ label, value, bestResult: { date, kg } }) => (
          <BestRecordRow
            key={label}
            value={value}
            label={label}
            date={date}
            bestResult={kg}
            onClose={removeFromChoseExercise}
          />
        ))}
      </div>

      <Button onClick={logOut} title="LogOut" name="LogOut">
        LogOut
      </Button>
    </div>
  );
};
export default UserProfile;
