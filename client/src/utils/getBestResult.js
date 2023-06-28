export const getBestResult = (exerciseSets, cb) => {
  const max = exerciseSets.reduce((a, b) => (a.kg > b.kg ? a : b), [0]).kg;
  cb(max);
};
