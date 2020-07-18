import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../../redux/user/user.selector";
import { addToFridgeStock } from "../../../redux/user/user.actions";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Main, Sub, Circle, YesNo } from "./styles";

export function IngredientCard({ ingredient, fridgeStock, addToFridgeStock }) {
  const [clicked, toggleClicked] = useState(false);
  const missing = !fridgeStock.includes(ingredient.name);
  const handleToggleClicked = () => missing && toggleClicked(!clicked);
console.log(ingredient)
  return (
    <Row clicked={clicked} onClick={() => handleToggleClicked()}>
      <Main>
        <Circle missing={missing} />
        {ingredient.name}
      </Main>
      <Sub>
        Add ingredient to fridgestock?
        <div style={{ display: "flex" }}>
          <YesNo yes={true} onClick={() => addToFridgeStock(ingredient.name)}>
            Yes
          </YesNo>
          <YesNo yes={false}>No</YesNo>
        </div>
      </Sub>
    </Row>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addToFridgeStock: (item) => dispatch(addToFridgeStock(item)),
});
const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});
export default connect(mapStateToProps, mapDispatchToProps)(IngredientCard);
