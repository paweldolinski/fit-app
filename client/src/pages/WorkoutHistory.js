import * as React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import WorkoutHistorySetRow from "../components/WorkoutHistorySetRow";
import { getUserInfoFromLocalStorage } from "../utils/localStorage";
import { getAllExercisesOptions } from "../utils/getAllExercisesOptions";
import { Chart } from "../components/Chart/Chart";
import Button from "../components/Buttons/Button";
import { Toggle } from "../components/Toggle/Toggle";

const WorkoutHistory = () => {
  const [workoutsFromStorage, setWorkoutsFromStorage] = useState([]);
  const [choseExercise, setChoseExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [reversedExerciseSets, setReversedExerciseSets] = useState([]);
  const [filteredExerciseSets, setFilteredSetExerciseSets] = useState([]);
  const [bestResult, setBestResult] = useState(0);
  const [worstResult, setWorstResult] = useState(0);
  const [buttonName, setButtonName] = useState("all");
  const [isTable, setIsTable] = useState(false);
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
    getWorst(setsArr || []);
    setExerciseSets(setsArr || []);
    setFilteredSetExerciseSets(setsArr || []);
    setReversedExerciseSets(setsArr.map(setsArr.pop, [...setsArr]) || []);
  };

  const handleExerciseChoose = ({ value }) => {
    if (value === choseExercise) return;

    setChoseExercise(value);
  };

  const getBestResult = (exerciseSets) => {
    const max = exerciseSets.reduce((a, b) => (a.kg > b.kg ? a : b), [0]).kg;
    setBestResult(max);
  };

  const getWorst = (exerciseSets) => {
    const min = exerciseSets.reduce((a, b) => (a.kg < b.kg ? a : b), [0]).kg;
    setWorstResult(min);
  };

  const toggleChart = (bool) => {
    setIsTable(bool);
  };

  const setActiveButton = ({ target: { name } }) => {
    setButtonName(name);
  };

  const getLastWorkout = (num) => {
    if (exerciseSets) {
      const getSevenWorkoutsDates = exerciseSets
        .map(({ date }) => date)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(-num);

      const getWorkoutsByDates = exerciseSets.filter(({ date }) =>
        getSevenWorkoutsDates.includes(date)
      );
      setFilteredSetExerciseSets(getWorkoutsByDates || []);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getExerciseHistory(workoutsFromStorage);
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
          <Toggle
            leftLabel="CHART"
            rightLabel="TABLE"
            toggle={isTable}
            onToggle={toggleChart}
          />
          <div className="workout-history__best-wrapper">
            <h2>{choseExercise}</h2>
            <p className="workout-history__best">Best: {bestResult}</p>
          </div>
        </>
      )}

      {isTable && choseExercise && (
        <>
          <div className="workout-history__results-wrapper">
            <div className="workout-history__results-header">
              <span>Date</span>
              <span>Kg</span>
              <span>Reps</span>
            </div>
            <div className="workout-history__results-table">
              {reversedExerciseSets?.map((props, index) => (
                <WorkoutHistorySetRow
                  {...props}
                  key={index}
                  min={worstResult}
                  max={bestResult}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {!isTable && choseExercise && (
        <>
          <div className="workout-history__btns-wrapper">
            <Button
              title="All workouts"
              name="all"
              onClick={(e) => {
                setActiveButton(e);
                getExerciseHistory(workoutsFromStorage);
              }}
              active={buttonName === "all"}
            />
            <Button
              title="Last 14 days"
              name="fourteen"
              onClick={(e) => {
                setActiveButton(e);
                getLastWorkout(14);
              }}
              active={buttonName === "fourteen"}
            />
            <Button
              title="Last 7 days"
              name="seven"
              onClick={(e) => {
                setActiveButton(e);
                getLastWorkout(7);
              }}
              active={buttonName === "seven"}
            />
          </div>
          <Chart sets={filteredExerciseSets} />
        </>
      )}
    </div>
  );
};

export default WorkoutHistory;
