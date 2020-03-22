import React, { useState } from "react";
import Modal from "react-modal";

import {
  OptionContainer,
  Title,
  InputContainer,
  PopUpContainer
} from "./styles";

const IngredientOptions = ({ ingredient, quantity, unit }) => {
  const [value, setValue] = useState(quantity);
  return (
    <PopUpContainer>
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
      <div style={{ borderRight: "1px solid #ccc" }}></div>
      <OptionContainer></OptionContainer>
    </PopUpContainer>
  );
};
export default IngredientOptions;
