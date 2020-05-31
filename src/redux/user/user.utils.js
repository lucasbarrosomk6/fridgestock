//optional file for more complex functions used in the subReducer

export const removeFromFridgeStock = (fridgeItems, fridgeItemToRemove) => {
  //if the quantity is 1, remove it
  return fridgeItems.filter((fridgeItem) => fridgeItem !== fridgeItemToRemove);
};
export const addToFridgeStock = (fridgeItems, fridgeItemToAdd) => {
  if (fridgeItems.includes(fridgeItemToAdd) || !fridgeItemToAdd.length) {
    return fridgeItems;
  } else {
    return [...fridgeItems, fridgeItemToAdd];
  }
};
