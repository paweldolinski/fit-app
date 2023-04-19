export const setItemToLocalstorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalstorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const removeItemFromLocalstorage = (key) => {
  return localStorage.removeItem(key);
};

export const getUserInfoFromLocalStorage = () =>
  getItemFromLocalstorage("userInfo");

export const setUserInfoToLocalStorage = (userInfo) =>
  setItemToLocalstorage("userInfo", userInfo);

export const getTokenFromLocalStorage = () => getItemFromLocalstorage("token");
export const setTokenToLocalStorage = (token) =>
  setItemToLocalstorage("token", token);
