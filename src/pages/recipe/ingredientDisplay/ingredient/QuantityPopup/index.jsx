import React, { useState } from "react";

import {
  OptionContainer,
  Title,
  InputContainer,
  PopUpContainer
} from "./styles";

const IngredientOptions = ({ ingredient, quantity, unit }) => {
  let startingQuantity = quantity;
  const [value, setValue] = useState(startingQuantity);
  console.log(quantity);
  return (
    <OptionContainer style={{ borderRight: "1px solid #ccc" }}>
      <Title>Change Quantity of this ingredient</Title>
      <InputContainer>
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </InputContainer>
    </OptionContainer>
  );
};
export default IngredientOptions;
