import React, { Component } from "react";
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
import {
  getLocalIngredients,
  setLocalIngredients
} from "../../utils/localStorage";
import Ingredient from "pages/recipe/IngredientDisplay/Ingredient";

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

  setIngredients = (ingredient, existingIngredients) => {
    console.log(ingredient, existingIngredients);
    if (
      ingredient.trim()

      // (if(existingIngredients.length) {existingIngredients.find(x => x.toLowerCase() !== ingredient.trim())})
    ) {
      setLocalIngredients("ingredients", [...existingIngredients, Ingredient]);
      this.setState({
        ingredients: this.state.ingredients
          ? [...this.state.ingredients, ingredient]
          : ingredient
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
        const uniqueArray = _.uniqBy(array, "title"); ///removes duplicates
        this.setState({
          recipes: uniqueArray.filter(
            recipe => recipe.missedIngredientCount === 0
          ),
          soClose: uniqueArray.filter(
            recipe => recipe.missedIngredientCount !== 0
          ),
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
