import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Link, Router } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import {
  FridgestockButton,
  FridgeStockDisplay,
  IngredientDisplay,
  DeleteContainer,
} from "./styles";
import AutoComplete from "../components/Search/AutoComplete";
import { getLocalStorage } from "../utils/localStorage";

class NavBarPrototype extends Component {
  state = {
    isOpen: false,
    ingredients: [],
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  setIngredients = (ingredient) => {
    const { ingredients } = this.state;
    const trimmedIngredient = { name: ingredient.trim(), isMissing: false }; //removes whitespace, denies duplicates and denies blank searches
    const isIngredientExisting =
      ingredients.length &&
      ingredients.find(
        (el) => el.name.toLowerCase() === trimmedIngredient.name.toLowerCase()
      );

    if (trimmedIngredient.name) {
      if (isIngredientExisting) {
        return;
      }

      localStorage.setItem(
        "ingredients",
        JSON.stringify([...ingredients, trimmedIngredient])
      );

      this.setState({
        ingredients: [...ingredients, trimmedIngredient],
      });
    } else {
      console.log("rejected");
    }
  };
  removeIngredient = (removeIngredient) => {
    const newIngredients = this.state.ingredients.filter(
      (x) => x.name !== removeIngredient.name
    );
    localStorage.setItem("ingredients", JSON.stringify(newIngredients));
    this.setState({ ingredients: newIngredients });
  };
  render() {
    const ingredientArray = getLocalStorage("ingredients");
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
            setIngredients={this.setIngredients}
          />
          {ingredientArray.map((Ingredient) => (
            <IngredientDisplay key={Ingredient.name}>
              {Ingredient.name}
              <DeleteContainer>
                <MDBIcon
                  far
                  icon="times-circle"
                  onClick={() => this.removeIngredient(Ingredient)}
                />
              </DeleteContainer>
            </IngredientDisplay>
          ))}
        </FridgeStockDisplay>
      </Navbar>
    );
  }
}

export default NavBarPrototype;
