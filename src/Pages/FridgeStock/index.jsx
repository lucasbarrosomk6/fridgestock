import React, { Component } from "react";
import Search from "components/Search";
import _, { debounce } from "lodash";
import {
  FridgestockContainer,
  InputContainer,
  RecipeContainer,
} from "./styles";
import Recipe from "components/RecipeCard";
import api from "utils/api";
import { getLocalStorage } from "utils/localStorage";
import { withFridge } from "../../Contexts/Fridge";
import USP from "../../components/USP";
import { USPData } from "../../assets/usp.js";

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
  fetchRandomRecipes = async () => {
    this.setState({ error: false, loaded: false, isLoading: true });

    try {
      const data = await api("recipes/random", {
        number: 3,
      });
      const refinedRecipes = [...data.recipes].map((item) => ({
        ...item,
        missedIngredients: [...item.extendedIngredients].map(
          (ingredient) => ingredient.name
        ),
      }));

      this.setState({
        recipes: refinedRecipes,
        error: false,
        loaded: true,
        isLoading: false,
      });
      return data.recipes;
    } catch (error) {
      console.log("error", error);
      this.setState({ error: true, loaded: true, isLoading: false });
    }
  };
  componentDidMount() {
    if (getLocalStorage("recipes")) {
      this.setState({
        recipes: getLocalStorage("recipes"),
        loaded: true,
      });
    } else {
      console.log("fetching random recipes");
      this.fetchRandomRecipes();
    }
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
        <USP data={USPData} />
        <InputContainer className="input-container">
          <Search
            ingredients={this.props.ingredients}
            fetchRecipes={this.fetchRecipes}
            isLoading={this.state.isLoading}
          />
        </InputContainer>

        {this.state.loaded && !!this.state.recipes.length && (
          <RecipeContainer className="recipe-container">
            {this.state.recipes.map((item, index) => (
              <div key={index}>
                <Recipe recipe={item} />{" "}
              </div>
            ))}
          </RecipeContainer>
        )}
      </FridgestockContainer>
    );
  }
}

export default withFridge(Fridgestock);
