import { useEffect, useState } from "react";
import { getItemFromLocalstorage } from "./localStorage";

export const useFinishedWorkouts = () => {
  const [finishedWorkouts, setFinishedWorkouts] = useState();

  const { workoutsArr } = getItemFromLocalstorage("userInfo");

  useEffect(() => {
    setFinishedWorkouts(workoutsArr);
  }, []);

  return finishedWorkouts;
};
