import chooseIngredients from "./choose-ingredients.jpg";
import selectRecipe from "./select-recipe.jpg";
import cookRecipe from "./cook-recipe.jpg";

export const USPData = [
  {
    title: "Enter ingredients",
    image: chooseIngredients,
    discription:
      "Enter the ingredients you have into the search bar below. We will search our database for recipes that include those ingredients and display them below",
  },
  {
    title: "Choose a Recipe",
    image: selectRecipe,
    discription:
      "The ingredients required for the recipe are listed below the title, the ingredients you have will appear in green, missing ingredients will appear red",
  },
  {
    title: "Cook",
    image: cookRecipe,
    discription:
      "Follow the instructions for the recipe, Not enough of one ingredient? No problem! You can edit the amount of each ingredient and we will adjust the proportions accordingly!",
  },
];
