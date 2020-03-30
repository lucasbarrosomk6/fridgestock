export const getLocalStorage = item => {
  const defaultValue = "";
  const foundItem = localStorage.getItem(`${item}`) || defaultValue;
  if (foundItem.length) {
    return JSON.parse(foundItem);
  }
  return defaultValue;
};
export const setLocalIngredients = (itemKey, itemValue) =>
  localStorage.setItem(itemKey, itemValue);
