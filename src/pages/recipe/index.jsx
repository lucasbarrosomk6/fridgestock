import React, { Component } from "react";
import TagBanner from "../../components/TagBanner";
import ImageDisplay from "./ImageDisplay";
import IngredientDisplay from "./IngredientDisplay";
import { RecipePageContainer } from "./styles";
import { Title } from "./styles";
import api from "../../utils/api";
import { getLocalStorage } from "utils/localStorage";

const tagFilterer = (recipe) => {
  const {
    vegetarian,
    vegan,
    glutenFree,
    veryHealthy,
    cheap,
    veryPopular,
    sustainable,
    dairyFree,
  } = recipe;

  const tags = {
    vegetarian,
    vegan,
    glutenFree,
    veryHealthy,
    cheap,
    veryPopular,
    sustainable,
    dairyFree,
  };
  const relevantRecipeKeys = Object.keys(tags);

  return relevantRecipeKeys.filter((key) => tags[key]);
};

export default class Recipe extends Component {
  state = {
    loading: true,
    error: false,
    recipe: {},
    missedIngredients: [],
    steps: [],
  };

  fetchData = async () => {
    try {
      this.setState({ loading: true });
      const data = await api(
        `recipes/${this.props.match.params.recipeId}/information`
      );

      this.setState({
        recipe: data,
        loading: false,
        steps: data.analyzedInstructions[0].steps,
      });
    } catch (error) {
      this.setState({ loading: false, error: true });
      this.props.history.push("/not-found");
    }
  };
  handleIngredientChange = (newIngredients) => {
    this.setState(({ recipe }) => ({
      recipe: { ...recipe, extendedIngredients: newIngredients },
    }));
  };
  componentDidMount() {
    this.fetchData();
    this.setState({ missedIngredients: getLocalStorage("missedIngredients") });
  }

  render() {
    const { recipe, missedIngredients, loading, steps } = this.state;
    const filteredTags = tagFilterer(recipe);
    console.log(recipe, loading);

    if (loading) return <Title>Thinking up something good</Title>;
    return (
      <RecipePageContainer className="recipe-page-container">
        <Title>{recipe.title}</Title>

        <TagBanner
          text={
            missedIngredients.length &&
            "You're missing the following ingredients"
          }
          data={missedIngredients}
          warning
        />

        <TagBanner data={filteredTags} />

        {this.props.missedIngredients}
        <ImageDisplay image={recipe.image} />
        <IngredientDisplay
          setIngredients={this.handleIngredientChange}
          ingredients={recipe.extendedIngredients}
        />

        <div>
          {steps.map((item) => (
            <div
              style={{ margin: "5px", display: "flex", alignItems: "center" }}
              key={item.number}
            >
              <h3
                style={{ paddingRight: "15px", borderRight: "1px solid black" }}
              >
                {item.number}
              </h3>
              <p style={{ paddingLeft: "15px" }}>{item.step}</p>
            </div>
          ))}
        </div>
      </RecipePageContainer>
    );
  }
}
