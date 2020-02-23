import React from "react";
import axios from "axios";

export default class extends React.Component {
  state = {
    searchField: "",
    ingredientAutocomplete: [],
    ingredients: [],
    recipes: [],
    soClose: [],
    isHovering: false
  };
  handleChange = e => {
    this.setState({ searchField: e.target.value });
    this.state.searchField.length > 2 && this.autocomplete();
  };
  autocomplete = async () => {
    try {
      this.setState({ error: false });
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=4&query=${this.state.searchField}`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
        }
      });
      this.setState({ ingredientAutocomplete: data });
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.setIngredients(this.state.searchField);
  };
  handleIngredientClick = ingredient => {
    if (
      this.state.ingredients.find(
        existingIngredient => existingIngredient.name === ingredient.name
      )
    ) {
      //eliminate repeats
      this.setState({
        searchfield: "",
        ingredientAutocomplete: []
      });
    } else {
      this.setState({
        searchField: "",
        ingredientAutocomplete: []
      });

      this.props.setIngredients(ingredient.name);
    }
  };

  render() {
    return (
      <div className="fridgestock-container">
        {/* want to make this its own Component */}
        <div className="fridgestock-container-h1">
          <h1>Enter ingredients</h1>
        </div>
        <form handleSubmit={this.handleSubmit}>
          <input
            className="fridgestock-search"
            onChange={this.handleChange}
            value={this.state.searchField}
          ></input>
        </form>

        <div className="autocomplete">
          {this.state.ingredientAutocomplete.length ? (
            this.state.ingredientAutocomplete.map((ingredient, index) => (
              <div
                className="autocomplete-ingredient"
                key={index}
                onClick={() => this.handleIngredientClick(ingredient)}
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
          {this.props.ingredients.length ? (
            this.props.ingredients.map((ingredient, index) => (
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
                    const ingredientsLess = this.props.ingredients.filter(
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
    );
  }
}
