import React, { Component } from "react";
import axios from "axios";
import { RecipePageContainer } from "./styles";
import {
  Title,
  ImageContainer,
  HoverMessage,
  TagContainer,
  Tag,
  WarningDiv,
  WarningIngredients
} from "./styles";

const key = "4f32aacd87mshd80a3d9bf2c94e4p119367jsn16e0dabdd012";
export default class Recipe extends Component {
  state = {
    loading: true,
    error: false,
    recipe: {},
    ingredients: {},
    hover: false,
    imageClicked: false,
    warningClick: false
  };
  handleHover = () => this.setState({ hover: !this.state.hover });
  handleWarningClick = () =>
    this.setState({ warningClick: !this.state.warningClick });

  handleImageClick = () => {
    this.setState({ imageClicked: !this.state.imageClicked });
  };
  fetchRecipe = async () => {
    try {
      this.setState({ loading: false });
      console.log("fetch started");
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.props.match.params.recipeId}/information`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": `${key}`
        }
      });
      this.setState({ recipe: data, ingredients: data.extendedIngredients });
      console.log("fetch completed", data);
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log("there was an error", error);
    }
  };
  getMissedIngredients() {
    const inventory = localStorage.getItem("ingredients").split(",");
    console.log(this.state.recipe);
  }
  componentDidMount() {
    console.log("componentDidMount started");
    this.fetchRecipe().then(this.getMissedIngredients());

    console.log(this.state.recipe);
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
      vegetarian: vegetarian,
      vegan: vegan,
      veryHealthy: veryHealthy,
      glutenFree: glutenFree,
      cheap: cheap,
      veryPopular: veryPopular,
      sustainable: sustainable,
      dairyFree: dairyFree
    };
    const tagKeys = Object.keys(tags);

    let filteredTags = tagKeys.filter(function(key) {
      return tags[key];
    });
    const missingIngredients = JSON.parse(
      localStorage.getItem("missingIngredients")
    );
    return (
      <RecipePageContainer className="recipe-page-container">
        <Title>{recipe.title}</Title>
        {missingIngredients.length ? (
          <WarningDiv
            clicked={this.state.warningClick}
            onClick={this.handleWarningClick}
          >
            <h1 style={{ color: "red" }}>
              Your are missing the following ingredients
            </h1>

            {this.state.warningClick && (
              <WarningIngredients>
                {missingIngredients.map(tag => (
                  <Tag
                    key={tag.id}
                    style={{ border: "red 2px solid", color: "red" }}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </WarningIngredients>
            )}
          </WarningDiv>
        ) : null}
        {filteredTags.length ? (
          <TagContainer>
            {filteredTags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagContainer>
        ) : null}

        {this.props.missedIngredients}
        <ImageContainer
          image={recipe.image}
          hover={this.state.hover}
          clicked={this.state.imageClicked}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          onClick={this.handleImageClick}
        >
          <HoverMessage hover={this.state.hover}>
            {this.state.clicked
              ? "click to colapse image"
              : "click to see full image"}
          </HoverMessage>
        </ImageContainer>
      </RecipePageContainer>
    );
  }
}
