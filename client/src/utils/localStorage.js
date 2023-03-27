const setItemToLocalstorage = (key, value) => {
  return localStorage.setItem(key, value);
};

const getItemFromLocalstorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeItemFromLocalstorage = (key) => {
  return localStorage.removeItem(key);
};

module.exports = {
  setItemToLocalstorage,
  getItemFromLocalstorage,
  removeItemFromLocalstorage,
};
