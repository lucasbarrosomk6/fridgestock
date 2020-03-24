import React, { Component } from "react";
import axios from "axios";
import Search from "../../components/Search";
import _ from "lodash";
import {
  FridgestockContainer,
  InputContainer,
  MakeItNowContainer,
  SoCloseContainer,
  RecipeContainer,
  Title,
  InputTitle
} from "./styles";
import Recipe from "../../components/RecipeCard";
import api from "../../utils/api";

class Fridgestock extends Component {
  state = {
    ingredients: [],
    recipes: [],
    soClose: [],
    loaded: false,
    error: false
  };
  componentDidMount() {
    if (localStorage.getItem("ingredients")) {
      const savedIngredients = localStorage.getItem("ingredients").split(",");
      JSON.stringify(localStorage.getItem("ingredients").length) &&
        this.setState({ ingredients: savedIngredients });
    }
    localStorage.setItem("missedIngredients", "");
  }
  setMissedIngredients = missedIngredients => {
    localStorage.setItem("missedIngredients", missedIngredients);
  };
  setIngredients = ingredient => {
    //removes whitespace, denies duplicates and denies blank searches
    console.log("setIngredient's argument", ingredient);
    const noSpaceIngredient = ingredient.trim();
    if (noSpaceIngredient) {
      if (
        this.state.ingredients.find(
          existingIngredient =>
            existingIngredient.toLowerCase() === noSpaceIngredient
        )
      ) {
        console.log("REJECTED: duplicate");
      } else {
        localStorage.setItem("ingredients", [
          ...this.state.ingredients,
          noSpaceIngredient
        ]);
        this.setState({
          ingredients: [...this.state.ingredients, noSpaceIngredient]
        });
      }
    } else {
      console.log("REJECTED: no ingredient found");
      this.setState({ ingredients: this.state.ingredients });
    }
  };
  removeIngredient = removeIngredient => {
    // filters out an ingredient matching the argument and sets the state to the new array
    console.log("removeIngredient has activated");
    const newIngredients = this.state.ingredients.filter(
      x => x !== removeIngredient
    );
    localStorage.setItem("ingredients", newIngredients);
    this.setState({ ingredients: newIngredients });
  };
  fetchRecipes = async () => {
    //   fetches recipes using the ingredients added as the query, sorts them into 2 catagories: recipes (all recipies that only use what you have) and so close(all recipes that have some of what you have) then checks for duplicates
    this.setState({ error: false, recipes: [], soClose: [] });
    try {
      const ingredientQueryString = this.state.ingredients;

      const recipeSort = array => {
        let uniqueArray = _.uniqBy(array, "title"); ///removes duplicates
        console.log("array: ", array, "duplicatefreeArray: ", uniqueArray);
        let i;
        for (i = 0; i < uniqueArray.length; i++) {
          if (uniqueArray[i].missedIngredientCount === 0) {
            this.setState({
              recipes: [...this.state.recipes, uniqueArray[i]],
              loaded: true,
              error: false
            });
          } else {
            this.setState({
              soClose: [...this.state.soClose, uniqueArray[i]],
              loaded: true,
              error: false
            });
          }
        }
      };
      const data = await api(
        "ingredients",
        `?number=20&ranking=2&ignorePantry=true&ingredients=${ingredientQueryString}`
      );

      if (
        this.state.recipes.find(
          existingRecipe => existingRecipe.name === data.title
        )
      ) {
        this.setState({
          recipes: this.state.recipes,
          soClose: this.state.soClose,
          loaded: true
        });
        console.log("recipes", this.state.recipes);
        console.log("soClose", this.state.soClose);
      } else {
        recipeSort(data);
        console.log("recipes", this.state.recipes);
        console.log("soClose", this.state.soClose);
        this.setState({ loaded: true });
      }
    } catch (error) {
      console.log(error);
      this.setState({ error: true, loaded: true });
    }
  };
  render() {
    return (
      <FridgestockContainer className="fridgeStock-container">
        <InputContainer className="input-container">
          <InputTitle>Show me what you got!</InputTitle>
          <Search
            setIngredients={this.setIngredients}
            ingredients={this.state.ingredients}
            fetchRecipes={this.fetchRecipes}
            recipes={this.state.recipes.length}
            soClose={this.state.soClose.length}
            removeIngredient={this.removeIngredient}
            loaded={this.state.loaded}
            error={this.state.error}
          />
        </InputContainer>
        {this.state.loaded && this.state.recipes && this.state.soClose ? (
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
              <Title>So Close!</Title>
              {this.state.soClose.length
                ? this.state.soClose.map((item, index) => (
                    <Recipe key={index} recipe={item} />
                  ))
                : null}
            </SoCloseContainer>
          </RecipeContainer>
        ) : (
          <RecipeContainer className="recipe-container">
            <Title>Available Recipes will apear here</Title>
          </RecipeContainer>
        )}
      </FridgestockContainer>
    );
  }
}

export default Fridgestock;
