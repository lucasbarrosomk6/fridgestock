export const getLocalIngredients = item =>
  localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item).split(","))
    : [];
console.log("worked!");

export const setLocalIngredients = (itemKey, itemValue) =>
  localStorage.setItem(itemKey, itemValue);
