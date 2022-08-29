export const updateLocalStore = (key, value) => localStorage
  .setItem(key, JSON.stringify(value));
export const getLocalStore = (key) => JSON.parse(localStorage.getItem(key));
