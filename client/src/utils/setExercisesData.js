export const setExercisesDataArray = (workoutsFromStorage) => {
  let result = [];

  workoutsFromStorage.forEach((workout) => {
    const { date, finishedExercises } = workout;

    finishedExercises.forEach(({ name, sets }) => {
      const isExerciseExist = result.some(({ label }) => label === name);
      //array of kilograms and dates of exercise for first iteration
      const kilogramsAndDates = sets.map(({ kg, reps }) => ({
        kg: parseFloat(kg),
        reps: parseInt(reps),
        date: date,
      }));

      if (isExerciseExist) {
        result.forEach((item) => {
          if (item.label === name) {
            sets.forEach(({ kg, reps }) =>
              item.sets.push({
                kg: parseFloat(kg),
                reps: parseInt(reps),
                date: date,
              })
            );
          }
        });

        return;
      }

      result.push({
        label: name,
        value: name,
        sets: kilogramsAndDates,
      });
    });
  });

  result.forEach((item) => {
    const best = item.sets.reduce((a, b) => (a > b.kg ? a : b.kg), [0]);
    const bestData = item.sets.find((item) => item.kg === best);

    item.bestResult = bestData;
  });

  return result;
};
