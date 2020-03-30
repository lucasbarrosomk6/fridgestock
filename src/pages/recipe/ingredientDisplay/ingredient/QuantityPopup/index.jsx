import React, { useState } from "react";

import {
  OptionContainer,
  Title,
  InputContainer,
  PopUpContainer
} from "./styles";

const IngredientOptions = ({ ingredient, quantity, unit }) => {
  let startingQuantity = quantity;
  const [value, setValue] = useState(`${startingQuantity}`);
  return (
    <OptionContainer>
      <Title>Change Quantity of this ingredient</Title>
      <InputContainer>
        <input
          type="text"
          value={value}
          onChange={e => setValue(`${e.target.value}`)}
        />
        <span style={{ marginLeft: `-${unit.length * 9}px` }}>{unit}</span>
      </InputContainer>
    </OptionContainer>
  );
};
export default IngredientOptions;
