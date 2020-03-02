import React, { Component } from "react";
import axios from "axios";

const key = "4f32aacd87mshd80a3d9bf2c94e4p119367jsn16e0dabdd012";
export default class Recipe extends Component {
  state = {
    loading: true,
    error: false,
    recipe: {},
    recipeId: this.props.match.params.recipeId
  };

  fetchRecipe = async () => {
    try {
      this.setState({ loading: false });
      console.log("fetch started");
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.state.recipeId}/information`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": `${key}`
        }
      });
      this.setState({ recipe: data });
      this.setState({ instructions: data.analyzedInstructions[0].steps });
      console.log("fetch completed");
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log("there was an error", error);
    }
  };
  componentDidMount() {
    console.log("componentDidMount started");
    this.fetchRecipe();
    console.log("componentDidMount finished");
  }
  render() {
    const { recipe, loading } = this.state;

    //this will log the analyzed instructions
    !loading &&
      console.log(
        "information in state within render:",
        recipe.analyzedInstructions
      );

    //this will cause an error
    // !loading&&console.log(
    //     "information in recipe within render:",
    //     recipe.analyzedInstructions[0].steps
    //   );
    //why does this cause an error?

    return (
      <div className="recipe-container">
        <h1>hello! this is a recipe container</h1>
        <p>{recipe.title}</p>
        <ul>
          {/* {loading &&
            recipe.analyzedInstructions[0].steps.map(instruction => (
              <li>{instruction}</li>
            ))} */}
        </ul>
      </div>
    );
  }
}
