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
import { MDBBtn } from "mdbreact";
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
      const soClose = uniqueArray.filter(
        (recipe) => recipe.missedIngredientCount !== 0
      );
      const recipes = uniqueArray.filter(
        (recipe) => recipe.missedIngredientCount === 0
      );

      this.setState({
        recipes: recipes,
        soClose: soClose,
        loaded: true,
        isLoading: false,
      });
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
          />
        </InputContainer>
        <MDBBtn
          onClick={this.fetchRecipes}
          disabled={!this.state.ingredients.length}
        >
          {this.state.isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Search For Recipes"
          )}
        </MDBBtn>
        {this.state.loaded && this.state.recipes && this.state.soClose && (
          <RecipeContainer className="recipe-container">
            <MakeItNowContainer
              recipesFetched={this.state.recipes.length}
              className="Make-it-now-container"
            >
              <Title>Make it now</Title>
              {this.state.recipes.length
                ? this.state.recipes.map((item, index) => (
                    <Recipe key={index} recipe={item} />
                  ))
                : null}
            </MakeItNowContainer>
            <SoCloseContainer
              soCloseFetched={this.state.soClose.length}
              className="soClose-container"
            >
              {this.state.soClose.length
                ? this.state.soClose.map((item, index) => (
                    <Recipe key={index} recipe={item} />
                  ))
                : null}
            </SoCloseContainer>
          </RecipeContainer>
        )}
      </FridgestockContainer>
    );
  }
}

export default Fridgestock;
