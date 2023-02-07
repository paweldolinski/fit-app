import Button from "../components/Button";
import { useContext } from "react";
import { WorkoutContext } from "../context/workoutContext";

const FinishedWorkout = ({ filteredExercise }) => {
  const { setIsWorkoutFinished, cancelWorkout } = useContext(WorkoutContext);
  const endWorkout = () => {
    cancelWorkout();
    setIsWorkoutFinished(false);
  };

  return (
    <div className="finished-workout">
      <h1>Workout finished</h1>
      <p className="finished-workout__text">
        Good job!
        <br /> You have finished your daily workout:
      </p>
      {filteredExercise &&
        filteredExercise.map((item, index) => (
          <div className="finished-workout__result" key={index}>
            <p key={index}>{item.name}</p>
            {item.sets.map((set) => (
              <p>
                {set.kg}kg x {set.reps}
              </p>
            ))}
          </div>
        ))}
      <p className="finished-workout__text">Arnie is proud of you.</p>
      <Button onClick={endWorkout} name="end workout" title="OK!" />
    </div>
  );
};

export default FinishedWorkout;
