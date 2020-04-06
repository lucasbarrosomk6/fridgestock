import React from "react";
import AutoComplete from "./AutoComplete";

const Search = ({ ingredients, setIngredients, removeIngredient }) => {
  return (
    <div>
      <AutoComplete className="autocomplete" setIngredients={setIngredients} />
    </div>
  );
};
export default Search;
