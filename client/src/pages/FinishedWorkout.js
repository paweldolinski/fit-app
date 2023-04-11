import Button from "../components/Button";
import { useContext } from "react";
import { WorkoutContext } from "../context/workoutContext";
import { convertMsToHM } from "../utils/time";

const FinishedWorkout = ({ filteredExercise }) => {
  const {
    setIsWorkoutFinished,
    cancelWorkout,
    workoutTimeMs,
    setIsWorkoutStarted,
  } = useContext(WorkoutContext);
  const workoutTime = convertMsToHM(workoutTimeMs);

  const endWorkout = () => {
    cancelWorkout();
    setIsWorkoutFinished(false);
  };

  return (
    <div className="finished-workout">
      <h1>Workout finished</h1>
      <p className="finished-workout__text">
        Good job! You have spent {workoutTime}
      </p>
      <p className="finished-workout__text">
        You have finished your daily workout:
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
