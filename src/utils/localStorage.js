export const getLocalStorage = item => {
  if (localStorage.getItem(`${item}`).length) {
    const savedItem = JSON.parse(localStorage.getItem(`${item}`));
    console.log("savedItem", JSON.stringify(savedItem));
    return savedItem;
  }
  return "";
};
export const setLocalIngredients = (itemKey, itemValue) =>
  localStorage.setItem(itemKey, itemValue);
