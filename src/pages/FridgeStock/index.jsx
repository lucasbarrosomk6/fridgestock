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
  InputTitle
} from "./styles";
import Recipe from "components/RecipeCard";
import api from "utils/api";
import { setLocalIngredients, getLocalStorage } from "utils/localStorage";

class Fridgestock extends Component {
  state = {
    ingredients: [],
    recipes: [],
    soClose: [],
    loaded: false,
    error: false
  };
  componentDidMount() {
    this.setState({ ingredients: getLocalStorage("ingredients") });
    console.log(getLocalStorage("ingredients"));
    localStorage.setItem("missedIngredients", "");
  }
  setMissedIngredients = missedIngredients => {
    localStorage.setItem("missedIngredients", missedIngredients);
  };
  setIngredients = ingredient => {
    //removes whitespace, denies duplicates and denies blank searches
    console.log("setIngredients", typeof ingredient);
    const { ingredients } = this.state;
    const trimmedIngredient = ingredient.trim();

    const isIngredientExisting =
      ingredients.length &&
      ingredients.find(el => el.toLowerCase() === trimmedIngredient);
    if (trimmedIngredient) {
      if (isIngredientExisting) {
        console.log("REJECTED: duplicate");
        return;
      }

      const newIngredients = [...ingredients, trimmedIngredient];
      console.log(typeof newIngredients);
      localStorage.setItem(
        "ingredients",
        JSON.stringify([...ingredients, trimmedIngredient])
      );
      console.log(typeof JSON.parse(localStorage.getItem("ingredients")));
      this.setState({
        ingredients: [...ingredients, trimmedIngredient]
      });
    } else {
      console.log("rejected");
    }
  };
  removeIngredient = removeIngredient => {
    // filters out an ingredient matching the argument and sets the state to the new array
    const newIngredients = this.state.ingredients.filter(
      x => x !== removeIngredient
    );
    setLocalIngredients("ingredients", newIngredients);
    this.setState({ ingredients: newIngredients });
  };
  fetchRecipes = async () => {
    this.setState({ error: false, recipes: [], soClose: [] });
    try {
      const recipeSort = array => {
        let uniqueArray = _.uniqBy(array, "title"); ///removes duplicates
        const soClose = uniqueArray.filter(
          recipe => recipe.missedIngredientCount !== 0
        );
        const recipes = uniqueArray.filter(
          recipe => recipe.missedIngredientCount === 0
        );
        this.setState({
          recipes: recipes,
          soClose: soClose,
          loaded: true
        });
      };
      const data = await api("recipes/findByIngredients", {
        number: 20,
        ranking: 1,
        ingredients: this.state.ingredients
      });
      recipeSort(data);
    } catch (error) {
      console.log("error", error);
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
