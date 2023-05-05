export const setItemToLocalstorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItemFromLocalstorage = (key) =>
  JSON.parse(localStorage.getItem(key));

export const removeItemFromLocalstorage = (key) => localStorage.removeItem(key);

export const getUserInfoFromLocalStorage = () =>
  getItemFromLocalstorage("userInfo");

export const setUserInfoToLocalStorage = (userInfo) =>
  setItemToLocalstorage("userInfo", userInfo);

export const getPreWorkoutFromLocal = () =>
  getItemFromLocalstorage("preWorkout");

export const setPreWorkoutsArrayToLocal = (workouts) => {
  if (workouts.length === 0) return;
  setItemToLocalstorage("preWorkout", workouts);
};

export const getTokenFromLocalStorage = () => getItemFromLocalstorage("token");

export const setTokenToLocalStorage = (token) =>
  setItemToLocalstorage("token", token);
