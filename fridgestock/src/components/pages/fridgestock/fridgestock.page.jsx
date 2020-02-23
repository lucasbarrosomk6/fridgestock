import React, { Component } from "react";
import Axios from "axios";
import "../../../App.css";

import Recipe from "../../recipe-card";

const key = "4f32aacd87mshd80a3d9bf2c94e4p119367jsn16e0dabdd012";

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

  handleChange = e => {
    this.setState({ searchField: e.target.value });
    this.state.searchField.length > 2 && this.autocomplete();
  };
  autocomplete = async () => {
    try {
      this.setState({ error: false });
      const { data } = await Axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=4&query=${this.state.searchField}`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": `${key}`
        }
      });
      this.setState({ ingredientAutocomplete: data });
    } catch (error) {
      console.log(error);
    }
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
      const { data } = await Axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=2&ignorePantry=true&ingredients=${ingredientQueryString}`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": `${key}`
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
      <div className="fridgestock">
        <div className="fridgestock-container">
          {/* want to make this its own Component */}
          <div className="fridgestock-container-h1">
            <h1>Enter ingredients</h1>
          </div>
          <input
            className="fridgestock-search"
            onChange={this.handleChange}
            value={this.state.searchField}
            onKeyDown={e =>
              e.key === "Enter" &&
              this.setState({
                ingredients: [...this.state.ingredients, this.state.searchField]
              })
            }
          ></input>
          <div className="autocomplete">
            {this.state.ingredientAutocomplete.length ? (
              this.state.ingredientAutocomplete.map((ingredient, index) => (
                <div
                  className="autocomplete-ingredient"
                  key={index}
                  onClick={() => {
                    if (
                      this.state.ingredients.find(
                        existingIngredient =>
                          existingIngredient.name === ingredient.name
                      )
                    ) {
                      //eliminate repeats
                      this.setState({
                        searchfield: "",
                        ingredientAutocomplete: []
                      });
                    } else {
                      this.setState({
                        ingredients: [
                          ...this.state.ingredients,
                          ingredient.name
                        ],
                        searchField: "",
                        ingredientAutocomplete: []
                      });
                    }
                  }}
                >
                  {ingredient.name}
                </div>
              ))
            ) : (
              <div className="autocomplete-ingredient">
                Add the contents of your fridge to the list!
              </div>
            )}
          </div>
          <div className="ingredients">
            {this.state.ingredients.length ? (
              this.state.ingredients.map((ingredient, index) => (
                <div
                  className="ingredient"
                  key={index}
                  onMouseEnter={this.handleHover}
                  onMouseLeave={this.handleHover}
                >
                  {/* <img src={ingredient.image} alt={ingredient.name} /> */}
                  <h4>{ingredient}</h4>
                  <button
                    className="remove-ingredient"
                    onClick={() => {
                      const ingredientsLess = this.state.ingredients.filter(
                        x => x !== ingredient
                      );
                      this.setState({ ingredients: ingredientsLess });
                    }}
                  >
                    remove
                  </button>
                </div>
              ))
            ) : (
              <div className="ingredient">
                <h4>ingredients that you search for will apear here!</h4>
              </div>
            )}
          </div>
        </div>
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
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  missed={recipe.missedIngredients}
                  used={recipe.usedIngredients}
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
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  missed={recipe.missedIngredients}
                  used={recipe.usedIngredients}
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
