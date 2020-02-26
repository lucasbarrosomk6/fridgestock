import React from "react";
import styled from "styled-components";
import IngredientCard from "../ingredient-card/ingredient-card.component";

const FlexShowcasekContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  max-height: 750px;
  width: 30vw;
  min-width: 400px;
  overflow: scroll;
  overflow: auto;
  border: 1px black solid;
  border-radius: 5vh;
  margin: 2.5% 5%;
  flex: 1;
`;
const FlexShowcaseTitle = styled.div`
  width: 100%;
  border-bottom: solid black 2px;
  text-align: center;
  background-color: lightgray;
  margin-bottom: 2%;
`;
const FlexShowcaseContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  flex: 1;
`;
export const FlexShowcase = ({ title, ingredients, recipes, remove }) => (
  <FlexShowcasekContainer>
    <FlexShowcaseTitle>
      <h1>{title}</h1>
    </FlexShowcaseTitle>
    <FlexShowcaseContent>
      {ingredients.length
        ? ingredients.map((ingredient, index) => (
            <IngredientCard key={index} name={ingredient} remove={remove} />
          ))
        : null}
    </FlexShowcaseContent>
  </FlexShowcasekContainer>
);
