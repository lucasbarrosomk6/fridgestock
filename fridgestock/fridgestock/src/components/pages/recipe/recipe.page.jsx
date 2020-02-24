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
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.state.recipeId}/information`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": `${key}`
        }
      });
      console.log(data);
      this.setState({ recipe: data });
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log("there was an error", error);
    }
  };
  componentDidMount() {
    console.log("component mounted");

    this.fetchRecipe();
  }
  render() {
    const { recipe } = this.state;
    console.log(typeof recipe.title);
    return (
      <div className="recipe-container">
        <h1>hello! this is a recipe container</h1>
        <p>{recipe.title}</p>
        <ul>
          {recipe.analyzedInstructions.steps.map(instruction => (
            <li>{instruction}</li>
          ))}
        </ul>
      </div>
    );
  }
}
