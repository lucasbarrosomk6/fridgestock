import React, { useState } from "react";
import Popup from "../../../../components/popUp";
import {
  IngredientContainer,
  NameContainer,
  QuantityContainer,
  OptionButton,
  OptionButtonLabel
} from "./styles";

const unitShortener = unitInput => {
  let unit = unitInput;
  console.log(unitInput);
  const badUnits = ["Kilorgrams", "Kilogram"];
  const goodUnits = ["kgs", "kg"];

  badUnits.forEach((item, index) =>
    unitInput.toLowerCase() === item.toLocaleLowerCase()
      ? (unit = goodUnits[index])
      : unit
  );
  return unit;
};
const amountRounder = (amount, unit) => {
  const roundableUnits = ["ml", "g"];
  let outcome = amount;
  let i;
  for (i = 0; i < roundableUnits.length; i++) {
    if (roundableUnits[i] === unit.toLocaleLowerCase()) {
      outcome = Math.round(amount);
      break;
    }
  }
  return outcome;
};
const Ingredient = ({ ingredient, unit }) => {
  const [clicked, handleClicked] = useState(false);
  const [popup, togglePopup] = useState(false);

  const us = ingredient.measures.us;
  const metric = ingredient.measures.metric;
  console.log(metric.unitShort);
  const metricQuantity = `${amountRounder(
    metric.amount,
    metric.unitShort
  )} ${unitShortener(metric.unitShort)}`;
  const imperialQuantity = `${us.amount} ${us.unitShort}`;
  return (
    <IngredientContainer>
      <QuantityContainer>
        {unit === "metric" ? metricQuantity : imperialQuantity}
      </QuantityContainer>
      <NameContainer>{ingredient.name}</NameContainer>
      <OptionButton onClick={() => handleClicked(!clicked)} clicked={clicked}>
        <OptionButtonLabel onClick={() => togglePopup(!popup)}>
          Change Ingredient
        </OptionButtonLabel>
      </OptionButton>
      {popup && (
        <Popup
          toggle={() => togglePopup(!popup)}
          id={ingredient.id}
          name={ingredient.name}
          amount={
            unit === "metric"
              ? amountRounder(metric.amount, metric.unitShort)
              : us.amount
          }
          unit={
            unit === "metric" ? unitShortener(metric.unitShort) : us.unitShort
          }
        />
      )}
    </IngredientContainer>
  );
};
export default Ingredient;
