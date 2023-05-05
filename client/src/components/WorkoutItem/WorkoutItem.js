import * as React from "react";
import { useContext, useEffect, useState } from "react";
import WorkoutSetRow from "./WorkoutSetRow";
import Button from "../Buttons/Button";
import { WorkoutContext } from "../../context/workoutContext";
import {
  getItemFromLocalstorage,
  setPreWorkoutsArrayToLocal,
} from "../../utils/localStorage";
import Icon from "../../assets/svg/checked2.svg";

const WorkoutItem = ({ exercise, checkIsEmptySetInAllSets }) => {
  const { name, sets } = exercise;
  const { updateExercise, filteredExercise, setFilteredExercise } =
    useContext(WorkoutContext);
  const [setsArr, setSetsArr] = useState(sets);
  const [prevSets, setPrevSets] = useState([]);
  const [isExerciseHidden, setIsExerciseHidden] = useState(false);

  const addSet = () => {
    setSetsArr([...setsArr, { id: setsArr.length, kg: "", reps: "" }]);
    checkIsEmptySetInAllSets();
  };

  const removeSet = (setId) => {
    const result = setsArr.filter(({ id }) => id !== setId);

    setSetsArr(result);
  };

  const removeWorkoutItemIfNoSets = () => {
    const results = filteredExercise.filter(({ sets }) => sets.length > 0);

    setFilteredExercise(results);
  };

  const copySet = (setId) => {
    const obj = {};

    setsArr.forEach((item) => {
      if (item.id === setId) {
        obj.id = setsArr.length;
        obj.kg = item.kg;
        obj.reps = item.reps;
      }
    });

    setSetsArr([...setsArr, obj]);
  };

  const onChange = (e) => {
    const {
      value,
      name,
      dataset: { id },
    } = e.target;
    const unit = name;
    const parsedId = parseInt(id);

    const setValues = setsArr.map((item) => {
      if (parsedId === item.id) {
        item[unit] = value;
      }
      return item;
    });

    updateExercise(setValues, name);
    checkIsEmptySetInAllSets();

    setPreWorkoutsArrayToLocal(filteredExercise);
  };

  const checkPrev = () => {
    const workouts = getItemFromLocalstorage("userInfo").workoutsArr;
    let lastWorkout = [];
    workouts &&
      workouts.map((workout) => {
        workout.finishedExercises.map((exercise) => {
          if (exercise.name === name) {
            lastWorkout.push(exercise);
          }
        });
      });

    if (lastWorkout.length > 0) {
      setPrevSets(lastWorkout.at(-1).sets);
    }
  };

  const getPrev = (index) => {
    let previousSet;

    prevSets.filter((prev) => {
      if (prev.id === index) {
        previousSet = `${prev.kg} x ${prev.reps}`;
      }
    });
    return previousSet;
  };

  const hideFinishedExercise = () => {
    setIsExerciseHidden(!isExerciseHidden);
  };

  useEffect(() => {
    checkPrev();
  }, []);

  useEffect(() => {
    updateExercise(setsArr, name);
    removeWorkoutItemIfNoSets();
  }, [setsArr]);

  return (
    <div className={isExerciseHidden ? "workout-item hidden" : "workout-item"}>
      <div className="workout-item__wrapper">
        <div className="workout-item__info">
          <div className="workout-item__exercise-name">
            <img
              onClick={hideFinishedExercise}
              alt="icon"
              className="workout-item__icon"
              src={Icon}
            />
            <p className="workout-item__exercise">{name}</p>
          </div>
          <div className="workout-item__sets">
            <p>Sets: {setsArr.length}</p>
          </div>
        </div>
        <div className="workout-item__sets-wrapper">
          {setsArr?.map((row, index) => (
            <WorkoutSetRow
              id={index}
              onChange={onChange}
              key={index}
              index={index}
              row={row}
              name={name}
              prev={getPrev(index)}
              removeSet={removeSet}
              copySet={copySet}
              kg={row.kg}
              reps={row.reps}
            />
          ))}
        </div>
        <Button onClick={addSet} title="+ Add set" name="addSet"></Button>
      </div>
    </div>
  );
};

export default WorkoutItem;
