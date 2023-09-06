import StartWorkoutButton from "../Buttons/StartWorkoutButton";
import { WorkoutContext } from "../../context/workoutContext";
import { useCallback, useContext, useState } from "react";
import Exercise from "./Exercises";
import Button from "../Buttons/Button";
import Input from "../Input";
import { useDebounce } from "../../utils/useDebounce";

export const WorkoutExercises = () => {
  const { exercises, filteredExercise, setIsWorkoutModalOpen } =
    useContext(WorkoutContext);
  const [results, setResults] = useState(exercises);
  const debounceResult = useDebounce(results, 1000);

  const isExerciseChose = (exercise) =>
    filteredExercise.some(({ name }) => name === exercise);

  const onSearchCb = useCallback(
    ({ target: { value } }) => {
      const result = exercises.filter(
        (item) =>
          item.label.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(result);
    },
    [results]
  );

  const groupByCategory = results.reduce((group, product) => {
    const { category } = product;

    group[category] = group[category] ?? [];
    group[category].push(product);

    return group;
  }, {});

  console.log(debounceResult, "de");
  console.log(groupByCategory);

  return (
    <>
      <h1 className="left">Add exercises</h1>
      <div className="workout__search-wrapper">
        <Input name="search" onChange={onSearchCb} placeholder="Search" />
      </div>
      <ul className="workout__exercises-wrapper">
        {/*{debounceResult?.map((exercise) => (*/}
        {/*  <Exercise*/}
        {/*    key={exercise}*/}
        {/*    exercise={exercise}*/}
        {/*    isExerciseChose={isExerciseChose(exercise)}*/}
        {/*  />*/}
        {/*))}*/}
        {Object.keys(groupByCategory).map((keyName, i) => (
          <li className="workout__exercise-category">
            <div className="category">{keyName} :</div>
            <ul>
              {groupByCategory[keyName].map(({ value, label }) => (
                <Exercise
                  key={value}
                  exercise={label}
                  isExerciseChose={isExerciseChose(value)}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <StartWorkoutButton />
      <Button
        onClick={() => setIsWorkoutModalOpen(false)}
        name="cancel"
        title="Cancel"
      />
    </>
  );
};
