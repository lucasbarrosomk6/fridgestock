import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { MDBIcon, MDBScrollbar } from "mdbreact";
import {
  FridgestockButton,
  FridgeStockDisplay,
  IngredientDisplay,
  DeleteContainer,
} from "./styles";
import AutoComplete from "../components/Search/AutoComplete";
import { getLocalStorage } from "../utils/localStorage";
import { withFridge } from "../Contexts/Fridge";
import { setIngredients, removeIngredient } from "utils/setIngredients";

class NavBarPrototype extends Component {
  state = {
    isOpen: false,
    ingredients: this.props.data,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
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
          <AutoComplete
            className="autocomplete"
            setIngredients={this.props.setIngredients}
          />
          {this.props.ingredients.map((Ingredient) => (
            <IngredientDisplay key={Ingredient.name}>
              {Ingredient.name}
              <DeleteContainer>
                <MDBIcon
                  far
                  icon="times-circle"
                  onClick={() =>
                    this.props.removeIngredient(
                      Ingredient,
                      this.props.ingredients
                    )
                  }
                />
              </DeleteContainer>
            </IngredientDisplay>
          ))}
        </FridgeStockDisplay>
      </Navbar>
    );
  }
}

export default withFridge(NavBarPrototype);
