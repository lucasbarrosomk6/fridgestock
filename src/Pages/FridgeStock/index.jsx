import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../redux/user/user.selector";

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
        usedIngredients:[],
        missedIngredients: [...item.extendedIngredients].map(
          (ingredient) =>({name: ingredient.name})
        ),
      }));
      

      console.log("missed Ingredients",refinedRecipes[0].missedIngredients)

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
      this.props.fridgeStock &&
      this.props.fridgeStock.length &&
      prevProps.fridgeStock !== this.props.fridgeStock
    ) {
      this.fetchRecipes();
    }
  }

  fetchRecipes = debounce(async () => {
    this.setState({ error: false, recipes: [], soClose: [], isLoading: true });
    try {
      const data = await api("recipes/findByIngredients", {
        number: 20,
        ranking: 1,
        ingredients: this.props.fridgeStock,
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

const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});

export default connect(mapStateToProps)(Fridgestock);
