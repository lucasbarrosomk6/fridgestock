import React from "react";
import { PopUpContainer, Display } from "./styles";

const PopUp = ({ onClick, unit, amount, name, clicked }) => {
  if (!clicked) return false;
  return (
    <PopUpContainer
      className="PopUpContainer"
      onClick={() => onClick(!clicked)}
    >
      <Display className="popup">
        <h1>
          {name} {amount} {unit}
        </h1>
      </Display>
    </PopUpContainer>
  );
};
export default PopUp;
