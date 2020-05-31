import React, { Component } from "react";
import Ingredient from "./Ingredient";
import {
  RecipePageContainer,
  TitleContainer,
  BasicInfo,
  Summary,
  Circle,
  IngredientDisplay,
  DisplayContainer,
  ImageContainer,
  Title,
  TagBanner,
} from "./styles";
import InstructionDisplay from "./InstructionDisplay";
import api from "../../utils/api";
import { getLocalStorage } from "utils/localStorage";
import { MDBBtn } from "mdbreact";
import ChipDisplay from "components/ChipDisplay";

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

const widthDectector = (array) => {
  //takes array, if its a name and a max width

  const quantityArray = array.map(
    (item) => ` ${item.measures.us.amount} ${item.measures.us.unitShort}`
  );
  const nameArray = array.map((item) => item.name);

  const longest = (stringArray) =>
    stringArray.sort(function (a, b) {
      return b.length - a.length;
    })[0];
  const longestQuantity = {
    idealWidth: longest(quantityArray).length * 9,
    maxWidth: 80,
  };
  const longestName = {
    idealWidth: longest(nameArray).length * 9,
    maxWidth: 180,
  };
  return {
    quantity: longestQuantity,
    name: longestName,
  };
};

class Recipe extends Component {
  state = {
    loading: true,
    error: false,
    backupRecipe: {},
    recipe: {},
    expandSummary: false,
    expandImage: false,
  };
  toggleExpandSummary = () => {
    this.setState({ expandSummary: !this.state.expandSummary });
  };
  toggleExpandImage = () => {
    this.setState({ expandImage: !this.state.expandImage });
  };

  fetchData = async () => {
    try {
      this.setState({ loading: true });
      const data = await api(
        `recipes/${this.props.match.params.recipeId}/information`
      );

      const untiedData = {
        ...data,
      };
      this.setState({
        backupRecipe: untiedData,
        recipe: untiedData,
        loading: false,
        steps: data.analyzedInstructions[0].steps,
      });
      localStorage.setItem("recipe", JSON.stringify(untiedData));
    } catch (error) {
      this.setState({ loading: false, error: true });
      this.props.history.push("/not-found");
    }
  };
  handleIngredientChange = (newQuantity, oldQuantity) => {
    const backupRecipe = { ...this.state.recipe };
    const ratio = newQuantity / oldQuantity;
    const oldIngredients = [...this.state.recipe.extendedIngredients];
    const newIngredients = oldIngredients.map((ingredient) => ({
      ...ingredient,
      measures: {
        ...ingredient.measures,
        us: {
          ...ingredient.measures.us,
          amount: ratio * ingredient.measures.us.amount,
        },
      },
    }));
    const oldRecipe = { ...this.state.recipe };
    const newRecipe = { ...oldRecipe, extendedIngredients: newIngredients };
    this.setState({
      recipe: newRecipe,
      backupRecipe: backupRecipe,
    });
  };
  clearNewRecipe = () => this.setState({ recipe: this.state.backupRecipe });
  componentDidMount() {
    //API call saving procausion, if recipe being viewed was the last to be viewed, use local storage instead of API call.
    const recipeId = this.props.match.params.recipeId;
    const untiedLocalStorage = { ...getLocalStorage("recipe") };
    if (untiedLocalStorage) {
      if (JSON.stringify(untiedLocalStorage.id) === recipeId) {
        this.setState({
          backupRecipe: untiedLocalStorage,
          recipe: untiedLocalStorage,
          loading: false,
        });
      } else {
        this.fetchData();
      }
    } else {
      this.fetchData();
    }
  }
  render() {
    const { recipe, loading, expandSummary, expandImage } = this.state;
    const filteredTags = tagFilterer(recipe);
    const calculatedWidths =
      recipe.extendedIngredients && widthDectector(recipe.extendedIngredients);

    if (loading || !recipe.id) return <Title>Thinking up something good</Title>;
    return (
      <RecipePageContainer className="recipe-page-container">
        <TitleContainer className="title-container">
          <ImageContainer
            onClick={() => this.toggleExpandImage()}
            clicked={expandImage}
            image={recipe.image}
          >
            <img src={recipe.image} alt={recipe.title} />
          </ImageContainer>
          <Circle />
          <BasicInfo className="basic-info">
            <Title>
              <strong>{recipe.title}</strong>
            </Title>
            <TagBanner className="tag-banner">
              <ChipDisplay data={filteredTags} />
            </TagBanner>

            <Summary
              expand={expandSummary}
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
            <MDBBtn onClick={this.toggleExpandSummary} color="primary">
              see{`${this.state.expand ? " less" : " more"}`}
            </MDBBtn>
          </BasicInfo>
        </TitleContainer>

        <DisplayContainer>
          <IngredientDisplay className="ingredient-display">
            <h1 style={{ fontSize: "1.5rem", zIndex: "3" }}>
              <strong>Ingredients</strong>
            </h1>
            {recipe.extendedIngredients &&
              recipe.extendedIngredients.length &&
              recipe.extendedIngredients.map((ingredient, index) => (
                <Ingredient
                  key={index}
                  index={index}
                  ingredient={ingredient}
                  handleIngredientChange={this.handleIngredientChange}
                  widths={calculatedWidths}
                />
              ))}
            {this.state.recipe !== this.state.backupRecipe && (
              <MDBBtn onClick={this.clearNewRecipe} color="primary">
                Restore to default values
              </MDBBtn>
            )}
          </IngredientDisplay>
          {recipe.analyzedInstructions[0].steps &&
            recipe.analyzedInstructions[0].steps.length && (
              <InstructionDisplay
                ingredients={recipe.extendedIngredients}
                steps={recipe.analyzedInstructions[0].steps}
              />
            )}
        </DisplayContainer>
      </RecipePageContainer>
    );
  }
}
export default Recipe;
