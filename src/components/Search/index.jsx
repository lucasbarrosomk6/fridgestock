import React from "react";
import AutoComplete from "./AutoComplete";
import { Ingredients } from "./styles";
import ChipDisplay from "components/ChipDisplay";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../redux/user/user.selector";
import { removeFromFridgeStock } from "../../redux/user/user.actions";

const Search = (props) => {
  console.log(props.fridgeStock);
  return (
    <>
      <AutoComplete className="autocomplete" />
      <Ingredients className="ingredientDisplay">
        <ChipDisplay
          data={props.fridgeStock}
          deleteFunction={props.removeFromFridgeStock}
        />
      </Ingredients>
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  removeFromFridgeStock: (item) => dispatch(removeFromFridgeStock(item)),
});

const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
