import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../redux/user/user.selector";
import Ingredient from "./Ingredient";
import {
  RecipePageContainer,
  TitleContainer,
  BasicInfo,
  Summary,
  DisplayContainer,
  ImageContainer,
  Title,
  RecipeStats,
  // TagBanner,
} from "./styles";

import InstructionDisplay from "./InstructionDisplay";
import api from "../../utils/api";
import { getLocalStorage } from "utils/localStorage";
import { MDBBtn } from "mdbreact";
import ExpandableContainer from "components/ExpandableContainer";
import { MDBIcon } from "mdbreact";

// const tagFilterer = (recipe) => {
//   const {
//     vegetarian,
//     vegan,
//     glutenFree,
//     veryHealthy,
//     cheap,
//     veryPopular,
//     sustainable,
//     dairyFree,
//   } = recipe;

//   const tags = {
//     vegetarian,
//     vegan,
//     glutenFree,
//     veryHealthy,
//     cheap,
//     veryPopular,
//     sustainable,
//     dairyFree,
//   };
//   const relevantRecipeKeys = Object.keys(tags);

//   return relevantRecipeKeys.filter((key) => tags[key]);
// };

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
    const { recipe, loading } = this.state;

    // const filteredTags = tagFilterer(recipe);
    console.log(recipe);
    const calculatedWidths =
      recipe.extendedIngredients && widthDectector(recipe.extendedIngredients);

    if (loading || !recipe.id) return <Title>Thinking up something good</Title>;
    return (
      <RecipePageContainer className="recipe-page-container">
        <TitleContainer className="title-container">
          <ImageContainer image={recipe.image}>
            <img src={recipe.image} alt={recipe.title} />
          </ImageContainer>

          <BasicInfo className="basic-info">
            <div style={{ position: "relative" }}>
              <h1>
                <strong>{recipe.title}</strong>
              </h1>{" "}
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <RecipeStats style={{ marginBottom: "5px" }}>
                  <MDBIcon far icon="clock" />
                  {" " + recipe.readyInMinutes} minutes
                </RecipeStats>

                <RecipeStats style={{ marginBottom: "5px" }}>
                  <MDBIcon icon="concierge-bell" />
                  {" " + recipe.servings} servings
                </RecipeStats>
                <RecipeStats style={{ marginBottom: "5px" }}>
                  <MDBIcon icon="search-dollar" />
                  {`$${Math.round(recipe.pricePerServing) / 100}`}
                  /serving
                </RecipeStats>
              </div>
            </div>

            <Summary dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          </BasicInfo>
        </TitleContainer>

        <DisplayContainer className="display-container">
          {recipe.extendedIngredients && recipe.extendedIngredients.length && (
            <ExpandableContainer
              title="Ingredients"
              clicked={true}
              ingredients={recipe.extendedIngredients}
            >
              {recipe.extendedIngredients.map((ingredient, index) => (
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
            </ExpandableContainer>
          )}

          {recipe.analyzedInstructions[0].steps &&
            recipe.analyzedInstructions[0].steps.length && (
              <ExpandableContainer title="instructions" clicked={true}>
                <InstructionDisplay
                  ingredients={recipe.extendedIngredients}
                  steps={recipe.analyzedInstructions[0].steps}
                />
              </ExpandableContainer>
            )}
        </DisplayContainer>
      </RecipePageContainer>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});
export default connect(mapStateToProps)(Recipe);
