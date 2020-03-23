import React, { useState } from "react";
import axios from "axios";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import IngredientOptions from "./QuantityPopup";

import {
  IngredientContainer,
  NameContainer,
  QuantityContainer,
  StyledPopup
} from "./styles";
import Popup from "reactjs-popup";

const Ingredient = ({ ingredient, unit, location, history, match }) => {
  const [similarIngredients, setSimilarIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(ingredient.measures.us.amount);

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

  return (
    <IngredientContainer className="Ingredient">
      <Popup
        trigger={
          <QuantityContainer>{`${quantity} ${us.unitShort}`}</QuantityContainer>
        }
        position={["bottom left"]}
        closeOnDocumentClick
      >
        <IngredientOptions
          quantity={quantity}
          setQuantity={setQuantity}
          unit={us.unitShort}
        />{" "}
      </Popup>
      <Popup
        trigger={<NameContainer>{ingredient.name}</NameContainer>}
        position={["bottom center"]}
        closeOnDocumentClick
        on="focus"
      >
        <IngredientOptions
          quantity={quantity}
          setQuantity={setQuantity}
          unit={us.unitShort}
        />
      </Popup>
    </IngredientContainer>
  );
};
export default withRouter(Ingredient);
