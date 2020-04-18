import React, { Component } from "react";
import Ingredient from "./IngredientDisplay/Ingredient";
import {
  RecipePageContainer,
  TitleContainer,
  BasicInfo,
  Summary,
  Circle,
  IngredientDisplay,
  DisplayContainer,
} from "./styles";
import InstructionDisplay from "./InstructionDisplay";
import { Title } from "./styles";
import api from "../../utils/api";
import { getLocalStorage } from "utils/localStorage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5ad3d1",
      main: "#5ad3d1",
      dark: "#FA8BA2",
    },
  },
});

export default class Recipe extends Component {
  state = {
    loading: true,
    error: false,
    backupRecipe: {},
    recipe: {},
    recipeChanged: false,
    ingredients: [],
    steps: [],
    expand: false,
  };
  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  };
  fetchData = async () => {
    try {
      this.setState({ loading: true });
      const data = await api(
        `recipes/${this.props.match.params.recipeId}/information`
      );

      const untiedData = {
        ...data,
        extendedIngredients: data.extendedIngredients.map((item) => {
          item.isMissing = true;
          for (var i = 0; i < getLocalStorage("ingredients").length; i++) {
            if (getLocalStorage("ingredients")[i].name === item.name) {
              item.isMissing = false;
              break;
            }
          }
          return item;
        }),
      };
      this.setState({
        backupRecipe: untiedData,
        recipe: untiedData,
        loading: false,
        steps: data.analyzedInstructions[0].steps,
      });
      console.log(this.state.recipe, untiedData);
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
    this.fetchData();
  }

  render() {
    const {
      recipe,

      ingredients,
      loading,

      expand,
    } = this.state;
    const filteredTags = tagFilterer(recipe);
    //console.log(recipe);
    if (loading) return <Title>Thinking up something good</Title>;
    return (
      <RecipePageContainer className="recipe-page-container">
        <TitleContainer className="title-container">
          <Circle />
          <BasicInfo className="basic-info">
            <h1 style={{ fontSize: "1.5rem", zIndex: "3" }}>
              <strong>{recipe.title}</strong>
            </h1>
            <ChipDisplay data={filteredTags} />
            <Summary
              expand={expand}
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
            <MDBBtn onClick={this.toggleExpand} color="primary">
              see{`${this.state.expand ? " less" : " more"}`}
            </MDBBtn>
          </BasicInfo>
          <div style={{ zIndex: "0", position: "absolute", right: "0" }}>
            <img src={recipe.image} alt={recipe.title} />
          </div>
        </TitleContainer>

        <DisplayContainer>
          <IngredientDisplay>
            <h1 style={{ fontSize: "1.5rem", zIndex: "3" }}>
              <strong>Ingredients</strong>
            </h1>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <Ingredient
                key={index}
                index={index}
                ingredient={ingredient}
                handleIngredientChange={this.handleIngredientChange}
              />
            ))}
            {this.state.recipe !== this.state.backupRecipe && (
              <MDBBtn onClick={this.clearNewRecipe} color="primary">
                Restore to default values
              </MDBBtn>
            )}
          </IngredientDisplay>
          <InstructionDisplay
            ingredients={recipe.extendedIngredients}
            steps={recipe.analyzedInstructions[0].steps}
          />
        </DisplayContainer>
      </RecipePageContainer>
    );
  }
}
