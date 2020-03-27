export const getLocalIngredientsBig = item => {
  if (localStorage.getItem(item)) {
    return localStorage.getItem(item).split(",");
  }
};

export const getLocalIngredients = item =>
  localStorage.getItem(item) && localStorage.getItem(item).split(",");
console.log("worked!");

export const setLocalIngredients = (itemKey, itemValue) =>
  localStorage.setItem(itemKey, itemValue);
