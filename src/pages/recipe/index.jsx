import React, { Component } from "react";
import axios from "axios";
import TagBanner from "../../components/TagBanner";
import ImageDisplay from "./ImageDisplay";
import IngredientDisplay from "./ingredientDisplay";
import { RecipePageContainer } from "./styles";
import { Title } from "./styles";

export default class Recipe extends Component {
  state = {
    loading: true,
    error: false,
    recipe: {},
    missedIngredients: []
  };

  fetchData = async () => {
    try {
      this.setState({ loading: true });
      console.log("fetch started");
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.props.match.params.recipeId}/information`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
        }
      });
      let missedIngredients = [];
      if (localStorage.getItem("missedIngredients")) {
        missedIngredients = JSON.parse(
          localStorage.getItem("missedIngredients")
        );
      }

      this.setState({
        recipe: data,
        missedIngredients: missedIngredients,
        loading: false
      });
      console.log("fetch completed", data, missedIngredients);
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log("there was an error", error);
    }
  };
  handleIngredientChange = newIngredients => {
    let recipe = this.state.recipe;
    recipe.extendedIngredients = newIngredients;
    this.setState({ recipe: recipe });
  };
  componentDidMount() {
    console.log("componentDidMount started");
    this.fetchData();
    console.log(this.state);
    console.log("componentDidMount finished");
  }
  render() {
    const { recipe } = this.state;
    const {
      vegetarian,
      vegan,
      glutenFree,
      veryHealthy,
      cheap,
      veryPopular,
      sustainable,
      dairyFree
    } = recipe;

    const tags = {
      vegetarian,
      vegan,
      glutenFree,
      veryHealthy,
      cheap,
      veryPopular,
      sustainable,
      dairyFree
    };
    const relevantRecipeKeys = Object.keys(tags);

    let filteredTags = relevantRecipeKeys.filter(function(key) {
      return tags[key];
    });

    if (this.state.loading) {
      return <Title>Thinking up something good</Title>;
    } else {
      return (
        <RecipePageContainer className="recipe-page-container">
          <Title>{recipe.title}</Title>
          {this.state.missedIngredients.length ? (
            <TagBanner
              text="You're missing the following ingredients"
              data={this.state.missedIngredients}
              warning={true}
            />
          ) : null}
          {filteredTags.length ? (
            <TagBanner data={filteredTags} warning={false} />
          ) : null}

          {this.props.missedIngredients}
          <ImageDisplay image={recipe.image} />
          <IngredientDisplay
            setIngredients={this.handleIngredientChange}
            ingredients={recipe.extendedIngredients}
          />
        </RecipePageContainer>
      );
    }
  }
}
