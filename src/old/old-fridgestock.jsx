import React, { Component } from "react";
import axios from "axios";
import "../../../App.css";

import Recipe from "../../recipe-card/recipe-card";
import IngredientBox from "../../IngredientBox";

class Fridgestock extends Component {
  state = {
    searchField: "",
    ingredientAutocomplete: [],
    ingredients: [],
    recipes: [],
    soClose: [],
    isHovering: false
  };

  handleHover = () => this.setState({ isHovering: !this.state.isHovering });

  setIngredients = ingredient => {
    this.setState({ ingredients: [...this.state.ingredients, ingredient] });
  };

  render() {
    return (
      <div className="fridgestock">
        <IngredientBox
          setIngredients={this.setIngredients}
          ingredients={this.state.ingredients}
        />
        <div className="fridgestock-container">
          <div className="fridgestock-container-h1">
            <h1>Search for Recipes</h1>
          </div>

          <button className="fetch-button" onClick={this.fetchRecipes}>
            Search
          </button>
          {this.state.recipes.length ? (
            <div
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h2 style={{ marginBottom: "5%" }}>Make it now!</h2>
              {this.state.recipes.map(recipe => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  history={this.props.history}
                  match={this.props.match}
                />
              ))}
            </div>
          ) : (
            <h1>cant make something outa nothin, pal</h1>
          )}
        </div>
        <div className="fridgestock-container">
          <div className="fridgestock-container-h1">
            <h1>So Close...</h1>
          </div>
          {this.state.soClose.length ? (
            <div className="so-close-inner">
              {this.state.soClose.map(recipe => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  history={this.props.history}
                  match={this.props.match}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Fridgestock;
