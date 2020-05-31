import React from "react";
import {
  InstructionDisplayStyles,
  InstructionContainer,
  StepNuber,
  StepContainer,
  IngredientContainer,
} from "./styles";
import ChipDisplay from "components/ChipDisplay";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../../redux/user/user.selector";

const InstructiontDisplay = ({ steps, ingredients, fridgeStock }) => {
  const ingredientArray = ingredients.map((ingredient) => {
    //used to determine if step uses an ingredient
    return {
      name: ingredient.name,
      nameArray: ingredient.name.split(" "),
    };
  });

  const newSteps = steps.map((step) => {
    const stepArray = step.step
      .replace(
        /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
        ""
      ) //removes punctuation
      .split(" ");
    const usedIngredients = [];
    ingredientArray.forEach((ingredient) => {
      if (ingredient.nameArray.some((el) => stepArray.includes(el))) {
        //if an ingredient's name is included in the text of the step, it is pushed to the "used ingredient" array
        usedIngredients.push({
          name: ingredient.name,
          isMissing: !fridgeStock.includes(ingredient.name), //
        });
      }
    });

    return {
      equipment: step.equipment,
      number: step.number,
      step: step.step,
      ingredients: usedIngredients,
    };
  });
  console.log(newSteps);
  return (
    <InstructionDisplayStyles>
      <h1 style={{ fontSize: "1.5rem", zIndex: "3" }}>
        <strong>Instructions</strong>
      </h1>
      {newSteps.map((step, index) => (
        <InstructionContainer
          key={step.number}
          className="instructionContainer"
        >
          <StepNuber className="stepNumber">{step.number}</StepNuber>
          <StepContainer className="stepContainer">
            {step.step}
            <IngredientContainer>
              <ChipDisplay data={step.ingredients} />
            </IngredientContainer>
          </StepContainer>
        </InstructionContainer>
      ))}
    </InstructionDisplayStyles>
  );
};
const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});
export default connect(mapStateToProps)(InstructiontDisplay);
