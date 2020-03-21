import React, { useState } from "react";
import Ingredient from "./ingredient";
import {
  IngredientDisplayContainer,
  IngredientContainer,
  RadioContainer,
  UnitToggle
} from "./styles";

const Toggle = props => (
  <UnitToggle
    onClick={() => props.handleUnitChange(props.unit)}
    selected={props.selected}
  >
    {props.unit}
  </UnitToggle>
);

const IngredientDisplay = ({ ingredients, setIngredients }) => {
  const [unit, handleUnitChange] = useState("metric");
  const [clicked, toggleClicked] = useState(false);

  return (
    <IngredientDisplayContainer>
      <RadioContainer>
        <Toggle
          selected={unit === "metric"}
          handleUnitChange={handleUnitChange}
          unit={"metric"}
        />
        <Toggle
          selected={unit === "imperial"}
          handleUnitChange={handleUnitChange}
          unit={"imperial"}
        />
      </RadioContainer>

      <IngredientContainer>
        {ingredients.map(ingredient => (
          <Ingredient key={ingredient.id} ingredient={ingredient} unit={unit} />
        ))}
      </IngredientContainer>
    </IngredientDisplayContainer>
  );
};
export default IngredientDisplay;
