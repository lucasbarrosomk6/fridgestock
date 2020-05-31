import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromFridgeStock } from "../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../redux/user/user.selector";

import { MDBIcon } from "mdbreact";
import {
  FridgestockButton,
  FridgeStockDisplay,
  IngredientDisplay,
  DeleteContainer,
} from "./styles";
import AutoComplete from "../components/Search/AutoComplete";

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    console.log(this.props.fridgeStock);
    return (
      <Navbar bg="light" id="nav" expand="lg" sticky="top">
        <Link to="/">
          <Navbar.Brand>
            <strong>FridgeStock</strong>
          </Navbar.Brand>
        </Link>
        <FridgestockButton
          clicked={this.state.isOpen}
          onClick={this.toggleCollapse}
        >
          <MDBIcon
            icon="utensils"
            size="2x"
            className={`${this.state.isOpen ? "cyan-text" : "white-text"}`}
          />
        </FridgestockButton>
        <FridgeStockDisplay clicked={this.state.isOpen}>
          <AutoComplete className="autocomplete" />
          {this.props.fridgeStock &&
            !!this.props.fridgeStock.length &&
            this.props.fridgeStock.map((Ingredient) => (
              <IngredientDisplay key={Ingredient}>
                {Ingredient}
                <DeleteContainer>
                  <MDBIcon
                    far
                    icon="times-circle"
                    onClick={() => this.props.removeFromFridgeStock(Ingredient)}
                  />
                </DeleteContainer>
              </IngredientDisplay>
            ))}
        </FridgeStockDisplay>
      </Navbar>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  removeFromFridgeStock: (item) => dispatch(removeFromFridgeStock(item)),
});

const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
