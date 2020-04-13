import React, { Component } from "react";
import Search from "components/Search";
import _ from "lodash";
import {
  FridgestockContainer,
  InputContainer,
  MakeItNowContainer,
  SoCloseContainer,
  RecipeContainer,
  Title,
} from "./styles";
import Recipe from "components/RecipeCard";
import api from "utils/api";
import { getLocalStorage } from "utils/localStorage";

class Fridgestock extends Component {
  state = {
    ingredients: [],
    recipes: [],
    soClose: [],
    isLoading: false,
    loaded: false,
    error: false,
  };
  componentDidMount() {
    this.setState({
      ingredients:
        getLocalStorage("ingredients") && getLocalStorage("ingredients"),
    });
    console.log(getLocalStorage("ingredients"));
    localStorage.setItem("missedIngredients", "");
  }
  setMissedIngredients = (missedIngredients) => {
    localStorage.setItem("missedIngredients", missedIngredients);
  };
  setIngredients = (ingredient) => {
    const { ingredients } = this.state;
    const trimmedIngredient = ingredient.trim(); //removes whitespace, denies duplicates and denies blank searches
    const isIngredientExisting =
      ingredients.length &&
      ingredients.find((el) => el.toLowerCase() === trimmedIngredient);

    if (trimmedIngredient) {
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
      this.fetchRecipes();
    } else {
      console.log("rejected");
    }
  };

  removeIngredient = (removeIngredient) => {
    // filters out an ingredient matching the argument and sets the state to the new array
    const newIngredients = this.state.ingredients.filter(
      (x) => x !== removeIngredient
    );
    localStorage.setItem("ingredients", newIngredients);
    this.setState({ ingredients: newIngredients });
  };

  fetchRecipes = async () => {
    this.setState({ error: false, recipes: [], soClose: [], isLoading: true });
    try {
      const data = await api("recipes/findByIngredients", {
        number: 20,
        ranking: 1,
        ingredients: this.state.ingredients,
      });

      const uniqueArray = _.uniqBy(data, "title"); ///removes duplicates
      this.setState({
        recipes: uniqueArray,
        loaded: true,
        isLoading: false,
      });
      console.log(this.state.isLoading);
    } catch (error) {
      console.log("error", error);
      this.setState({ error: true, loaded: true });
    }
  };
  render() {
    return (
      <FridgestockContainer className="fridgeStock-container">
        <InputContainer className="input-container">
          <Search
            setIngredients={this.setIngredients}
            ingredients={this.state.ingredients}
            removeIngredient={this.removeIngredient}
            fetchRecipes={this.fetchRecipes}
            isLoading={this.state.isLoading}
          />
        </InputContainer>
        <div>
          {this.state.loaded && !!this.state.recipes.length && (
            <RecipeContainer className="recipe-container">
              {this.state.recipes.map((item, index) => (
                <div key={index} style={{ margin: "10px" }}>
                  <Recipe recipe={item} />{" "}
                </div>
              ))}
            </RecipeContainer>
          )}
        </div>
      </FridgestockContainer>
    );
  }
}

export default Fridgestock;
