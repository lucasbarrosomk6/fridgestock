export const setIngredients = (ingredient, ingredients = []) => {
  try {
    const trimmedIngredient = { name: ingredient.trim(), isMissing: false }; //removes whitespace, denies duplicates and denies blank searches
    const isIngredientExisting = ingredients.find(
      (el) => el.name.toLowerCase() === trimmedIngredient.name.toLowerCase()
    );
    if (trimmedIngredient.name) {
      if (isIngredientExisting) {
        return;
      }
      const nextIngredients = [...ingredients, trimmedIngredient];
      localStorage.setItem("ingredients", JSON.stringify(nextIngredients));
      return nextIngredients;
    } else {
      console.log("rejected");
    }
  } catch (err) {}
};
export const removeIngredient = (removeIngredient, ingredients) => {
  const newIngredients = ingredients.filter(
    (x) => x.name !== removeIngredient.name
  );
  localStorage.setItem("ingredients", JSON.stringify(newIngredients));
  return newIngredients;
};
