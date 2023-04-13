import { getItemFromLocalstorage } from "./localStorage";

export const getAllExercisesOptions = () => {
  const { workoutsArr } = getItemFromLocalstorage("userInfo");
  let result = [];

  workoutsArr?.forEach(({ finishedExercises }) =>
    finishedExercises.forEach(({ name }) => result.push(name))
  );

  //remove duplicates and set option object
  return result
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((exercise) => ({
      value: exercise,
      label: exercise,
    }));
};
