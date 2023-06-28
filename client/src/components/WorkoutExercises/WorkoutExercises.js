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
      const result = exercises.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setResults(result);
    },
    [results]
  );

  return (
    <>
      <h1 className="left">Add exercises</h1>
      <div className="workout__search-wrapper">
        <Input name="search" onChange={onSearchCb} placeholder="Search" />
      </div>
      <ul className="workout__exercises-wrapper">
        {debounceResult?.map((exercise) => (
          <Exercise
            key={exercise}
            exercise={exercise}
            isExerciseChose={isExerciseChose(exercise)}
          />
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
