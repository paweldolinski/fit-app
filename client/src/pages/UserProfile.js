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
import { BestRecordTile } from "../components/userProfile/BestRecordTile";
import AwardIcon from "../assets/svg/award-icon.svg";

const selectStyles = {
  clearIndicator: () => ({
    display: "none",
  }),
};

const UserProfile = () => {
  const { logOut } = useContext(UserContext);
  const [userObj] = useState(getItemFromLocalstorage("userInfo"));
  const [lastWorkoutDate, setLastWorkoutDate] = useState();
  const [choseExercises, setChoseExercises] = useState(userObj.bestResults);
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  const [allExercisesArr, setAllExercisesArr] = useState([]);

  const removeFromChoseExercise = ({
    target: {
      dataset: { name },
    },
  }) => {
    const result = choseExercises.filter(({ value }) => value !== name);
    setChoseExercises(result);
  };

  const setBestResultOfExercise = (result) =>
    result.forEach(
      (item) =>
        (item.bestResult = item.kg.reduce((a, b) => (a > b ? a : b), [0]))
    );

  const setKilogramsOfExercises = (workoutsFromStorage) => {
    let result = [];

    workoutsFromStorage.forEach((workout) => {
      const date = workout.date;

      workout.finishedExercises.forEach(({ name, sets }) => {
        const isExerciseExist = result.some(({ label }) => label === name);
        //array of kgs for first iteration
        const kilograms = sets.map(({ kg }) => parseFloat(kg));

        if (isExerciseExist) {
          result.forEach((item) => {
            if (item.label === name) {
              sets.forEach(({ kg }) => item.kg.push(parseFloat(kg)));
            }
          });

          return;
        }
        result.push({ label: name, date: date, value: name, kg: kilograms });
      });
    });

    setBestResultOfExercise(result);

    setAllExercisesArr(result);
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

  const updateBestExercises = async () => {
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

    try {
      const response = await fetch("/workout/addToBestResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          exercises: choseExercises,
          email: userObj.email,
        }),
      });

      const json = await response.json();

      if (json) {
        existingStorage.bestResults = choseExercises;
        setUserInfoToLocalStorage(existingStorage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const lastWorkoutDate = userObj.workoutsArr.slice(-1)[0]?.date;
    setLastWorkoutDate(lastWorkoutDate);
    verify();
    console.log("1");
    setKilogramsOfExercises(userObj.workoutsArr);
  }, []);

  useEffect(() => {
    updateBestExercises();
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
          options={allExercisesArr}
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

      <div className="best-tiles">
        {choseExercises?.map(({ label, value, bestResult, date }) => (
          <BestRecordTile
            key={label}
            value={value}
            label={label}
            date={date}
            bestResult={bestResult}
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
