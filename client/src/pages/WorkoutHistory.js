import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import WorkoutHistorySetRow from "../components/WorkoutHistorySetRow";

const WorkoutHistory = () => {
  const [workoutsFromDb, setWorkoutsFromDb] = useState([]);
  const [exercisesArr, setExercisesArr] = useState([]);
  const [choseExercise, setChosedExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [bestResult, setBestResult] = useState();

  const memoExercisesOptionArray = useMemo(
    () =>
      exercisesArr?.map((exercise) => ({
        value: exercise,
        label: exercise,
      })),
    [exercisesArr]
  );

  const getWorkoutHistory = () => {
    const getData = window.localStorage.getItem("userInfo");
    const { workoutsArr } = JSON.parse(getData);
    let setsArr = [];

    setWorkoutsFromDb(workoutsArr);

    workoutsArr.forEach((item) => {
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

    setExerciseSets(setsArr || []);
  };

  const getExercises = () => {
    let result = [];
    workoutsFromDb.forEach((item) => {
      item.finishedExercises.map(({ name }) => {
        result.push(name);
      });
    });
    const removeDuplicates = result.filter((v, i, a) => a.indexOf(v) === i);

    setExercisesArr(removeDuplicates);
  };

  const handleExerciseChoose = ({ value }) => {
    if (value === choseExercise) return;

    setExerciseSets([]);
    setChosedExercise(value);
  };

  const getBestResult = () => {
    const max = exerciseSets.reduce((a, b) => (a.kg > b.kg ? a : b)).kg;
    setBestResult(max);
  };

  useEffect(() => {
    getWorkoutHistory();
  }, [choseExercise]);

  useEffect(() => {
    exerciseSets.length > 1 && getBestResult();
  }, [exerciseSets]);

  useEffect(() => {
    getExercises();
  }, [workoutsFromDb]);

  return (
    <div className="workout-history">
      <h1>History</h1>
      <Select
        options={memoExercisesOptionArray}
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
              {exerciseSets?.map((props) => (
                <WorkoutHistorySetRow {...props} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkoutHistory;
