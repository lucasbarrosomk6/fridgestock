import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../redux/user/user.selector";
import { withRouter, Link } from "react-router-dom";
import Collapse from "react-collapse";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import IngredientCard from "./IngredientCard";
import {
  RecipeCardContainer,
  RecipeImage,
  InfoContainer,
  IngredientContainer,
  Title,
  CloseContainer,
  IngredientProgress,
} from "./styles";
import { MDBIcon } from "mdbreact";

export function RecipeCard({ recipe, match, fridgeStock }) {
  const { image, title, usedIngredients, missedIngredients, id } = recipe;
  
  const ingredients = usedIngredients.concat(missedIngredients);
  const [open, toggleOpen] = useState(false);
  const percentage =
    ingredients &&
    fridgeStock &&
    Math.floor(
      (fridgeStock.filter((item) =>
        ingredients.map((item) => item.name).includes(item)
      ).length /
        ingredients.length) *
        100
    );

  return (
    <RecipeCardContainer>
      <Link to={`/recipe/${id}`}>
        <RecipeImage src={image} alt={title} />
      </Link>

      <InfoContainer>
        <Title>{title}</Title>
        <Title>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>Ingredients you have</div>
            <IngredientProgress>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({ textSize: "2rem" })}
              />
            </IngredientProgress>
          </div>
        </Title>
        <CloseContainer onClick={() => toggleOpen(!open)} clicked={open}>
          <MDBIcon icon="angle-up" />
        </CloseContainer>

        <Collapse isOpened={open}>
          <IngredientContainer>
            {ingredients.map((ingredient, index) => (
              <IngredientCard key={index} ingredient={ingredient} />
            ))}
          </IngredientContainer>
        </Collapse>
      </InfoContainer>
    </RecipeCardContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});
export default connect(mapStateToProps)(withRouter(RecipeCard));
