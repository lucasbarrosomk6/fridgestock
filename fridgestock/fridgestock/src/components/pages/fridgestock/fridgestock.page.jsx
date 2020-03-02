import React, { Component } from "react";
import styled from "styled-components";
import Search from "../../search/search.component";
import { FlexShowcase } from "components/flex-showcase/flex-showcase.component";
import axios from "axios";

const FridgestockContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100vw;
`;

class Fridgestock extends Component {
  state = {
    ingredients: [],
    recipes: [],
    soClose: []
  };
  setIngredients = ingredient => {
    console.log("setIngredient's argument", ingredient);
    const noSpaceIngredient = ingredient.trim();
    if (noSpaceIngredient) {
      if (
        this.state.ingredients.find(
          existingIngredient =>
            existingIngredient.toLowerCase() === ingredient.toLowerCase()
        )
      ) {
        console.log("REJECTED: duplicate");
      } else {
        this.setState({
          ingredients: [...this.state.ingredients, ingredient.trim()]
        });
      }
    } else {
      console.log("REJECTED: no ingredient found");
      this.setState({ ingredients: this.state.ingredients });
    }
  };
  removeIngredient = removeIngredient => {
    console.log("removeIngredient has activated");
    const newIngredients = this.state.ingredients.filter(
      x => x !== removeIngredient
    );
    this.setState({ ingredients: newIngredients });
  };
  fetchRecipes = async () => {
    //   make "ignore pantry" dynamic once you can make it work without it
    try {
      this.setState({ error: false, recipes: [], soClose: [] });

      const ingredientQueryString = this.state.ingredients;

      const recipeSort = array => {
        let i;
        for (i = 0; i < array.length; i++) {
          if (array[i].missedIngredientCount === 0) {
            this.setState({ recipes: [...this.state.recipes, array[i]] });
          } else {
            this.setState({ soClose: [...this.state.soClose, array[i]] });
          }
        }
      };
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=2&ignorePantry=true&ingredients=${ingredientQueryString}`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
        }
      });
      if (
        this.state.recipes.find(
          existingRecipe => existingRecipe.name === data.title
        )
      ) {
        console.log(data);
        this.setState({ recipes: this.state.recipes });
        console.log("recipes", this.state.recipes);
        console.log("soClose", this.state.soClose);
      } else {
        console.log(data);
        recipeSort(data);
        console.log("recipes", this.state.recipes);
        console.log("soClose", this.state.soClose);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <FridgestockContainer>
        <Search
          setIngredients={this.setIngredients}
          ingredients={this.state.ingredients}
          fetchRecipes={this.fetchRecipes}
        />
        <FlexShowcase
          title="Ingredients"
          ingredients={this.state.ingredients}
          remove={this.removeIngredient}
        />
        <FlexShowcase title="Make it now" recipes={this.state.recipes} />
        <FlexShowcase title="So close..." soClose={this.state.soClose} />
      </FridgestockContainer>
    );
  }
}

export default Fridgestock;
