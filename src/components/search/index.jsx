import React from "react";
import AutoComplete from "./AutoComplete";
import { Ingredients } from "./styles";
import Chip from "@material-ui/core/Chip";

const Search = ({ ingredients, setIngredients, removeIngredient }) => {
  return (
    <>
      <AutoComplete className="autocomplete" setIngredients={setIngredients} />
      <Ingredients className="ingredientDisplay">
        {!!ingredients.length &&
          ingredients.map((item) => (
            <Chip
              key={item}
              label={item}
              onDelete={() => removeIngredient(item)}
              className={`ingredientChip ${item}`}
            />
          ))}
      </Ingredients>
    </>
  );
};
export default Search;
