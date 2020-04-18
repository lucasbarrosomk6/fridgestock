import React from "react";
import AutoComplete from "./AutoComplete";
import { Ingredients } from "./styles";
import ChipDisplay from "components/ChipDisplay";

const Search = ({
  ingredients,
  setIngredients,
  removeIngredient,
  fetchRecipes,
  isLoading,
}) => {
  return (
    <>
      <AutoComplete className="autocomplete" setIngredients={setIngredients} />
      <Ingredients className="ingredientDisplay">
        <ChipDisplay data={ingredients} deleteFunction={removeIngredient} />;
      </Ingredients>
    </>
  );
};
export default Search;
