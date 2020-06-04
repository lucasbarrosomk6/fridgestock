import React from "react";
import {
  InstructionDisplayStyles,
  InstructionContainer,
  StepNuber,
  StepContainer,
  IngredientContainer,
  IngredientList,
} from "./styles";

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
  return (
    <InstructionDisplayStyles>
      {newSteps.map((step, index) => (
        <InstructionContainer
          key={step.number}
          className="instructionContainer"
        >
          <StepNuber className="stepNumber">
            <strong>{step.number}</strong>
          </StepNuber>
          <StepContainer className="stepContainer">
            {step.step}
            <IngredientContainer>
              {!!step.ingredients.length && <strong>Step includes:</strong>}

              {step.ingredients.map((item, index) => (
                <IngredientList missing={item.isMissing} key={item.name}>
                  <strong>
                    {` ${item.name}${
                      index !== step.ingredients.length - 1 ? ", " : ""
                    }`}
                  </strong>
                </IngredientList>
              ))}
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
