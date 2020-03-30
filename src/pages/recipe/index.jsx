import React, { Component } from "react";
import TagBanner from "../../components/TagBanner";
import ImageDisplay from "./ImageDisplay";
import IngredientDisplay from "./IngredientDisplay";
import { RecipePageContainer } from "./styles";
import { Title } from "./styles";
import api from "../../utils/api";

const tagFilterer = recipe => {
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

  return relevantRecipeKeys.filter(key => tags[key]);
};

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
      const data = await api(
        `recipes/${this.props.match.params.recipeId}/information`
      );
      this.setState({
        recipe: data,
        missedIngredients:
          JSON.parse(localStorage.getItem("missedIngredients")) || [],
        loading: false
      });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };
  handleIngredientChange = newIngredients => {
    this.setState(({ recipe }) => ({
      recipe: { ...recipe, extendedIngredients: newIngredients }
    }));
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const { recipe } = this.state;
    const filteredTags = tagFilterer(recipe);
    if (this.state.loading) {
      return <Title>Thinking up something good</Title>;
    } else {
      return (
        <RecipePageContainer className="recipe-page-container">
          <Title>{recipe.title}</Title>

          <TagBanner
            text="You're missing the following ingredients"
            data={this.state.missedIngredients}
            warning
          />

          <TagBanner data={filteredTags} />

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
