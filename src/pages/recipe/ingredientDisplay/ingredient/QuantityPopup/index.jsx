import React, { useState } from "react";

import {
  OptionContainer,
  Title,
  InputContainer,
  PopUpContainer
} from "./styles";

const IngredientOptions = ({ ingredient, quantity, unit }) => {
  let startingQuantity = quantity;
  const [value, setValue] = useState(`${startingQuantity} ${unit ? unit : ""}`);
  console.log(unit);
  return (
    <OptionContainer>
      <Title>Change Quantity of this ingredient</Title>
      <InputContainer>
        <input
          type="text"
          value={value}
          onChange={e => setValue(`${e.target.value} ${unit ? unit : ""}`)}
        />
        <span style={{ marginLeft: `-${unit.length * 9}px` }}>{unit}</span>
      </InputContainer>
    </OptionContainer>
  );
};
export default IngredientOptions;
