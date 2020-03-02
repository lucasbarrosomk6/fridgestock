import React from "react";
import styled from "styled-components";
import IngredientCard from "../ingredient-card/ingredient-card.component";
import Recipe from "../recipe-card/recipe-card";

const FlexShowcasekContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  max-height: 750px;
  width: 30vw;
  min-width: 400px;
  box-shadow: 2px 2px 3px 2px black;

  overflow: auto;
  border-radius: 1vh;
  margin: 2.5% 5%;
  flex: 1;
`;
const FlexShowcaseTitle = styled.div`
  width: 100%;
  text-align: center;
  background-image: url("https://storage.needpix.com/rsynced_images/metal-316803_1280.jpg");

  margin-bottom: 2%;
`;
const FlexShowcaseContent = styled.div`
  display: flex;
  justify-content: ${props => (props.ingredients ? "flex-start" : "center")};
  align-items: ${props => (!props.ingredients ? "flex-start" : "center")};
  flex-direction: ${props => (props.ingredients ? "column" : "row")};
  flex-wrap: wrap;
  width: 90%;
  flex: 1;
  overflow-y: auto;
  background-image: url();
`;

export const FlexShowcase = ({
  title,
  ingredients,
  recipes,
  soClose,
  remove
}) => (
  <FlexShowcasekContainer>
    <FlexShowcaseTitle>
      <h1>{title}</h1>
    </FlexShowcaseTitle>
    <FlexShowcaseContent>
      {ingredients
        ? ingredients.map((ingredient, index) => (
            <IngredientCard key={index} name={ingredient} remove={remove} />
          ))
        : null}
      {recipes
        ? recipes.map((recipe, index) => <Recipe key={index} recipe={recipe} />)
        : null}
      {soClose
        ? soClose.map((recipe, index) => <Recipe key={index} recipe={recipe} />)
        : null}
    </FlexShowcaseContent>
  </FlexShowcasekContainer>
);
