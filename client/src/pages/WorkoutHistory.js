import * as React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import WorkoutHistorySetRow from "../components/WorkoutHistorySetRow";
import { getUserInfoFromLocalStorage } from "../utils/localStorage";
import { getAllExercisesOptions } from "../utils/getAllExercisesOptions";

const WorkoutHistory = () => {
  const [workoutsFromStorage, setWorkoutsFromStorage] = useState([]);
  const [choseExercise, setChoseExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [bestResult, setBestResult] = useState();
  const allExercisesArr = getAllExercisesOptions();

  const getUserData = () => {
    const getData = getUserInfoFromLocalStorage();
    const { workoutsArr } = getData;

    setWorkoutsFromStorage(workoutsArr);
  };

  const getExerciseHistory = (workoutsFromStorage) => {
    let setsArr = [];

    workoutsFromStorage.forEach((item) => {
      const { timestamp } = item;
      const date = new Date(timestamp).toLocaleDateString();
      const { sets } =
        item.finishedExercises.find(({ name }) => name === choseExercise) || {};

      if (sets) {
        sets.forEach((set) => {
          const { kg, reps } = set;
          const setObj = { date, kg: "", reps: "" };

          setObj.kg = parseInt(kg);
          setObj.reps = parseInt(reps);
          setsArr.push(setObj);
        });
      }
    });

    getBestResult(setsArr || []);
    setExerciseSets(setsArr || []);
  };

  const handleExerciseChoose = ({ value }) => {
    if (value === choseExercise) return;

    setChoseExercise(value);
  };

  const getBestResult = (exerciseSets) => {
    const max = exerciseSets.reduce((a, b) => (a.kg > b.kg ? a : b), [0]).kg;
    setBestResult(max);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getExerciseHistory(workoutsFromStorage);
    console.log("test1");
  }, [choseExercise]);

  return (
    <div className="workout-history">
      <h1>History</h1>
      <Select
        options={allExercisesArr}
        placeholder="Choose exercise"
        onChange={handleExerciseChoose}
        className="workout-history__select"
      />

      {choseExercise && (
        <>
          <div className="workout-history__best-wrapper">
            <h2>{choseExercise}</h2>
            <p className="workout-history__best">Best: {bestResult}</p>
          </div>
          <div className="workout-history__results-wrapper">
            <div className="workout-history__results-header">
              <span>Date</span>
              <span>Kg</span>
              <span>Reps</span>
            </div>
            <div className="workout-history__results-table">
              {exerciseSets?.map((props, index) => (
                <WorkoutHistorySetRow {...props} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
      {/*<Chart sets={exerciseSets} />*/}
    </div>
  );
};

export default WorkoutHistory;
