import React, { Component } from "react";
import Search from "components/Search";
import _, { debounce } from "lodash";
import {
  FridgestockContainer,
  InputContainer,
  MakeItNowContainer,
  SoCloseContainer,
  RecipeContainer,
  Title,
} from "./styles";
import Recipe from "components/RecipeCard";
import api from "utils/api";
import { getLocalStorage } from "utils/localStorage";
import { setIngredients, removeIngredient } from "utils/setIngredients";
import { withFridge } from "../../Contexts/Fridge";

class Fridgestock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      soClose: [],
      isLoading: false,
      loaded: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({
      recipes: getLocalStorage("recipes") || [],
      loaded: !!getLocalStorage("recipes"),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.ingredients &&
      this.props.ingredients.length &&
      prevProps.ingredients !== this.props.ingredients
    ) {
      this.fetchRecipes();
    }
  }

  fetchRecipes = debounce(async () => {
    this.setState({ error: false, recipes: [], soClose: [], isLoading: true });
    try {
      const ingredientNames = this.props.ingredients.map((item) => item.name);
      const data = await api("recipes/findByIngredients", {
        number: 20,
        ranking: 1,
        ingredients: ingredientNames,
      });

      const uniqueRecipes = _.uniqBy(data, "title"); ///removes duplicates
      this.setState({
        recipes: uniqueRecipes,
        loaded: true,
        isLoading: false,
      });
      localStorage.setItem("recipes", JSON.stringify(uniqueRecipes));
    } catch (error) {
      console.log("error", error);
      this.setState({ error: true, loaded: true });
    }
  }, 500);

  render() {
    return (
      <FridgestockContainer className="fridgeStock-container">
        <InputContainer className="input-container">
          <Search
            ingredients={this.props.ingredients}
            fetchRecipes={this.fetchRecipes}
            isLoading={this.state.isLoading}
          />
        </InputContainer>
        <div>
          {this.state.loaded && !!this.state.recipes.length && (
            <RecipeContainer className="recipe-container">
              {this.state.recipes.map((item, index) => (
                <div key={index} style={{ margin: "10px" }}>
                  <Recipe recipe={item} />{" "}
                </div>
              ))}
            </RecipeContainer>
          )}
        </div>
      </FridgestockContainer>
    );
  }
}

export default withFridge(Fridgestock);
