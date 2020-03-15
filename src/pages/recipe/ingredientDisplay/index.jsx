import React, { useState } from "react";
import Ingredient from "./ingredient";
import Popup from "../../../components/popUp";
import {
  IngredientDisplayContainer,
  IngredientContainer,
  ButtonContainer,
  RadioContainer,
  UnitToggle
} from "./styles";

const IngredientDisplay = ({ ingredients, setIngredients }) => {
  const [unit, handleUnitChange] = useState("metric");
  const [clicked, toggleClicked] = useState(false);

  return (
    <IngredientDisplayContainer>
      <RadioContainer>
        <UnitToggle
          onClick={() => handleUnitChange("metric")}
          selected={unit === "metric" ? true : false}
        >
          Metric
        </UnitToggle>
        <UnitToggle
          onClick={() => handleUnitChange("imperial")}
          selected={unit === "imperial" ? true : false}
        >
          Imperial
        </UnitToggle>
      </RadioContainer>

      <IngredientContainer>
        {ingredients.map(ingredient => (
          <Ingredient key={ingredient.id} ingredient={ingredient} unit={unit} />
        ))}
      </IngredientContainer>
      <ButtonContainer onClick={() => toggleClicked(!clicked)}>
        Change Ingredients
      </ButtonContainer>
      {clicked && (
        <Popup
          onClick={() => toggleClicked(!clicked)}
          setIngredients={setIngredients}
        ></Popup>
      )}
    </IngredientDisplayContainer>
  );
};
export default IngredientDisplay;
