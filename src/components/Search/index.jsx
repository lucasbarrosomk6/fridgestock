import React from "react";
import AutoComplete from "./AutoComplete";
import { Ingredients } from "./styles";
import ChipDisplay from "components/ChipDisplay";
import { withFridge } from "../../Contexts/Fridge";

const Search = (props) => {
  return (
    <>
      <AutoComplete
        className="autocomplete"
        setIngredients={props.setIngredients}
      />
      <Ingredients className="ingredientDisplay">
        <ChipDisplay
          data={props.ingredients}
          deleteFunction={props.removeIngredient}
        />
        ;
      </Ingredients>
    </>
  );
};
export default withFridge(Search);
