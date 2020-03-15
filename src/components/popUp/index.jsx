import React from "react";
import { PopUpContainer, Display } from "./styles";

const PopUp = ({ toggle, unit, amount, name }) => {
  return (
    <PopUpContainer className="PopUpContainer" onClick={() => toggle()}>
      <Display className="popup">
        <h1>
          {name} {amount} {unit}
        </h1>
      </Display>
    </PopUpContainer>
  );
};
export default PopUp;
