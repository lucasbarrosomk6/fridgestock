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
      recipes: getLocalStorage("recipes") && getLocalStorage("recipes"),
      loaded: !!getLocalStorage("recipes"),
    });

    this.setState({ ingredients: getLocalStorage("ingredients") });
    window.addEventListener("storage", (e) =>
      this.setState({ ingredients: e.newValue })
    );
  }
  setIngredients = (ingredient) => {
    this.setState({ ingredients: getLocalStorage("ingredients") });
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
      this.fetchRecipes();
    } else {
      console.log("rejected");
    }
  };

  removeIngredient = (removeIngredient) => {
    // filters out an ingredient matching the argument and sets the state to the new array
    console.log("before", this.state.ingredients);
    const newIngredients = this.state.ingredients.filter(
      (x) => x.name !== removeIngredient.name
    );
    localStorage.setItem("ingredients", JSON.stringify(newIngredients));
    this.setState({ ingredients: newIngredients });
    console.log("after", newIngredients);
  };

  fetchRecipes = async () => {
    console.log("fetch started");
    this.setState({ error: false, recipes: [], soClose: [], isLoading: true });
    try {
      const ingredientNames = [...this.state.ingredients].map(
        (item) => item.name
      );
      const data = await api("recipes/findByIngredients", {
        number: 20,
        ranking: 1,
        ingredients: ingredientNames,
      });

      const uniqueArray = _.uniqBy(data, "title"); ///removes duplicates
      this.setState({
        recipes: uniqueArray,
        loaded: true,
        isLoading: false,
      });
      localStorage.setItem("recipes", JSON.stringify(uniqueArray));
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
