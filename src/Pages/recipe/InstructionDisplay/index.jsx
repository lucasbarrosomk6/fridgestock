import React from "react";
import {
  InstructionDisplayStyles,
  InstructionContainer,
  StepNuber,
  StepContainer,
  IngredientContainer,
} from "./styles";
import ChipDisplay from "components/ChipDisplay";
const InstructiontDisplay = ({ steps, ingredients }) => {
  const newSteps = steps.map((step) => {
    step.ingredients.forEach((ingredient) => {
      ingredient.isMissing = true;
      for (var i = 0; i < ingredients.length; i++) {
        if (ingredients[i].name === ingredient.name) {
          if (ingredients[i].isMissing === false) {
            ingredient.isMissing = false;
            break;
          }
        }
      }
    });
    return step;
  });
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
export default InstructiontDisplay;
