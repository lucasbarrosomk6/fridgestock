import React, { useState, useCallback } from "react";
import Select from "react-select";
import axios from "axios";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Popup from "../../../../components/popUp";
import {
  IngredientContainer,
  NameContainer,
  QuantityContainer
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
const Ingredient = ({ ingredient, unit, location, history, match }) => {
  const [clicked, handleClicked] = useState(false);
  const [similarIngredients, setSimilarIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const handleModalClose = useCallback(() => toggleModal(false), []);
  const handleModalOpen = useCallback(() => toggleModal(true), []);
  console.log(showModal);
  const parsed = queryString.parse(location.search);

  const fetchSimilarIngredients = async ingredient => {
    setLoading(true);
    const { data } = await axios({
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/${ingredient.id}/substitutes`,
      method: "get",
      headers: {
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
      }
    });

    setLoading(false);
    console.log(data.substitutes);

    data.substitutes &&
      setSimilarIngredients(
        data.substitutes.map(ingredient => ({
          value: ingredient,
          label: ingredient
        }))
      );
  };

  const handleSelect = data => {
    const parsed = queryString.parse(location.search);
    parsed[ingredient.name] = data.value;

    const stringified = queryString.stringify(parsed);

    console.log(stringified);
    history.push(`${match.url}?${stringified}`);
  };

  const us = ingredient.measures.us;
  const metric = ingredient.measures.metric;
  const metricQuantity = amountRounder(metric.amount, metric.unitShort);
  const imperialQuantity = us.amount;
  let dynamicQuantity;
  if (unit === "metric") {
    dynamicQuantity = metricQuantity;
  } else {
    dynamicQuantity = imperialQuantity;
  }
  let dynamicUnit;
  if (unit === "metric") {
    dynamicUnit = metric.unitShort;
  } else {
    dynamicUnit = us.unitShort;
  }
  return (
    <IngredientContainer className="Ingredient" onClick={handleModalOpen}>
      <QuantityContainer>
        {dynamicQuantity}
        {dynamicUnit}
      </QuantityContainer>
      <NameContainer>{ingredient.name}</NameContainer>

      <Popup
        showModal={showModal}
        closeModal={handleModalClose}
        ingredient={ingredient}
        unit={dynamicUnit}
        quantity={dynamicQuantity}
      />
    </IngredientContainer>
  );
};
export default withRouter(Ingredient);
