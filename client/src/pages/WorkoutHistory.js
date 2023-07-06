import * as React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import WorkoutHistorySetRow from "../components/WorkoutHistorySetRow";
import { getUserInfoFromLocalStorage } from "../utils/localStorage";
import { Chart } from "../components/Chart/Chart";
import Button from "../components/Buttons/Button";
import { Toggle } from "../components/Toggle/Toggle";
import { setExercisesDataArray } from "../utils/setExercisesData";

const WorkoutHistory = () => {
  const [choseExercise, setChoseExercise] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [reversedExerciseSets, setReversedExerciseSets] = useState([]);
  const [filteredExerciseSets, setFilteredExerciseSets] = useState([]);
  const [bestResult, setBestResult] = useState(0);
  const [worstResult, setWorstResult] = useState(0);
  const [buttonName, setButtonName] = useState("all");
  const [isTable, setIsTable] = useState(false);
  const { workoutsArr } = getUserInfoFromLocalStorage();
  const exercisesData = setExercisesDataArray(workoutsArr);

  const getAllExercisesSets = () => {
    const {
      sets,
      bestResult: { kg, date },
    } = exercisesData.find(({ label }) => label === choseExercise) || {};

    setBestResult(kg || 0);
    getWorst(sets);
    setExerciseSets(sets || []);
    setFilteredExerciseSets(sets || []);
    setReversedExerciseSets(sets.map(sets.pop, [...sets]) || []);
  };

  const handleExerciseChoose = ({ value }) => {
    if (value === choseExercise) return;

    setChoseExercise(value);
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
      setFilteredExerciseSets(getWorkoutsByDates || []);
    }
  };

  useEffect(() => {
    //dlaczego useEffect wykonuje sie podczas pierwszego renderowania (choseExercise się nie zmienia)
    if (choseExercise.length === 0) return;
    getAllExercisesSets();
  }, [choseExercise]);

  return (
    <div className="workout-history">
      <h1>History</h1>
      <Select
        options={exercisesData}
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
                getAllExercisesSets();
              }}
              active={buttonName === "all"}
            />
            <Button
              title="Last 14 workouts"
              name="fourteen"
              onClick={(e) => {
                setActiveButton(e);
                getLastWorkout(14);
              }}
              active={buttonName === "fourteen"}
            />
            <Button
              title="Last 7 workouts"
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
