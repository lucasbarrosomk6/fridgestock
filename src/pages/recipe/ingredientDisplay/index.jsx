import React, { useState } from "react";
import Ingredient from "./Ingredient";
import {
  IngredientDisplayContainer,
  IngredientContainer,
  RadioContainer,
  UnitToggle,
} from "./styles";

const Toggle = (props) => (
  <UnitToggle
    onClick={() => props.handleUnitChange(props.unit)}
    selected={props.selected}
  >
    {props.unit}
  </UnitToggle>
);
const logWidth = (width) => {
  console.log(width);
};
const IngredientDisplay = ({ ingredients, setIngredients }) => {
  const [unit, handleUnitChange] = useState("metric");

  return (
    <IngredientDisplayContainer>
      <IngredientContainer>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            ingredient={ingredient}
            unit={unit}
            logWidth={logWidth}
          />
        ))}
      </IngredientContainer>
    </IngredientDisplayContainer>
  );
};
export default IngredientDisplay;
