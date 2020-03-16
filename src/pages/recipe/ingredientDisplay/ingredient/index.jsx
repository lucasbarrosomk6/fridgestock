import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Popup from "../../../../components/popUp";
import {
  IngredientContainer,
  NameContainer,
  QuantityContainer,
  OptionButton,
  OptionButtonLabel
} from "./styles";

// https:react-select.com/styles

const options = [
  {
    id: "3d0f2532-ef24-41f2-b32a-8700329e501c",
    name: "Lempi Reilly",
    username: "Alejandrin_Kautzer",
    email: "Cyrus.Russel69@hotmail.com",
    address: {
      street: "Stokes Skyway",
      suite: 88716,
      city: "East Ginafort",
      zipcode: "28957-5274",
      geo: {
        lat: "82.3287",
        lng: "37.8787"
      }
    },
    phone: "306.404.4181",
    website: "fritz.com",
    company: {
      name: "Gutmann Inc",
      catchPhrase: "Horizontal background adapter",
      bs: "magnetic scale solutions"
    }
  },
  {
    id: "3d0fdsdsfdsf2532-ef24-41f2-b32a-8700329e501c",
    name: "Lucas Reilly",
    username: "Alejandrin_Kautzer",
    email: "Cyrus.Russel69@hotmail.com",
    address: {
      street: "Stokes Skyway",
      suite: 88716,
      city: "East Ginafort",
      zipcode: "28957-5274",
      geo: {
        lat: "82.3287",
        lng: "37.8787"
      }
    },
    phone: "306.404.4181",
    website: "fritz.com",
    company: {
      name: "Gutmann Inc",
      catchPhrase: "Horizontal background adapter",
      bs: "magnetic scale solutions"
    }
  }
];

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
  const [popup, togglePopup] = useState(false);
  const [similarIngredients, setSimilarIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

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
  console.log(metric.unitShort);
  const metricQuantity = `${amountRounder(metric.amount, metric.unitShort)}`;
  const imperialQuantity = us.amount;
  return (
    <IngredientContainer>
      {/* <QuantityContainer>
        {unit === "metric" ? metricQuantity : imperialQuantity}
      </QuantityContainer> */}

      <input
        value={`${unit === "metric" ? metricQuantity : imperialQuantity}`}
      />
      {unit === "metric" ? metric.unitShort : us.unitShort}

      <Select
        options={similarIngredients}
        onFocus={() => fetchSimilarIngredients(ingredient)}
        placeholder={
          parsed[ingredient.name] ? parsed[ingredient.name] : ingredient.name
        }
        isLoading={loading}
        onChange={handleSelect}
        styles={{ container: () => ({ width: 200 }) }}
      />
      {/* <OptionButton onClick={() => handleClicked(!clicked)} clicked={clicked}>
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
      )} */}
    </IngredientContainer>
  );
};
export default withRouter(Ingredient);
