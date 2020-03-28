import React, { Component } from "react";
import { debounce } from "lodash";
import {
  SearchBar,
  SearchBarForm,
  AutoComplete,
  AutoCompleteItem,
  Ingredients,
  RecipeSearchButton
} from "./styles";
import IngredientCard from "components/IngredientCard";
import api from "../../utils/api";

class Search extends Component {
  state = {
    error: false,
    autoComplete: [],
    searchField: "",
    DoIngredientsExist: false
  };
  componentDidMount() {
    this.props.ingredients.length
      ? this.setState({ DoIngredientsExist: true })
      : this.setState({ DoIngredientsExist: false });
    console.log(this.props.ingredients);
  }
  handlesubmit = e => {
    e.preventDefault();

    this.props.setIngredients(
      this.state.searchField,
      this.props.ingredients.join()
    );
    this.setState({
      autoComplete: [],
      searchField: "",
      DoIngredientsExist: true
    });
  };
  handleAutocompleteSelect = x => {
    this.props.setIngredients(x, this.props.ingredients.join());

    this.setState({
      searchField: "",
      autoComplete: [],
      buttonClicked: false
    });
  };

  handleClick = () => {
    this.props.fetchRecipes().then(this.setState({ buttonClicked: true }));
    this.setState({ searchField: "" });
  };
  handleChange = e => {
    this.setState({ searchField: e.target.value, autoComplete: [] });
    this.fetchAutoComplete();
    !this.state.searchField.length && this.setState({ autoComplete: [] });
  };
  fetchAutoComplete = debounce(async () => {
    console.log("autocomplete triggered");
    this.setState({ isSearching: true });
    const data = await api("food/ingredients/autocomplete", {
      query: this.state.searchField,
      number: 5
    });
    this.setState({ autoComplete: data, isSearching: false });
  }, 700);

  render() {
    console.log(this.props.ingredients);
    return (
      <SearchBarForm
        onSubmit={this.handlesubmit}
        className="searchForm"
        autoComplete="off"
      >
        <SearchBar
          id="SearchBar"
          className="search-bar"
          type="text"
          value={this.state.searchField}
          onChange={this.handleChange}
          placeholder="Enter ingredients here"
        />

        <AutoComplete
          className="autocomplete"
          fetchedItems={this.state.autoComplete.length ? true : false}
        >
          {this.state.autoComplete
            ? this.state.autoComplete.map((item, index) => (
                <AutoCompleteItem
                  className="autocomplete-item"
                  onClick={() => this.handleAutocompleteSelect(item.name)}
                  key={index}
                >
                  {item.name}
                </AutoCompleteItem>
              ))
            : null}
        </AutoComplete>
        {this.props.ingredients ? (
          <Ingredients
            ingredientsExist={this.props.ingredients.length}
            className="ingredients"
          >
            {this.props.ingredients.map((item, index) => (
              <IngredientCard
                remove={this.props.removeIngredient}
                name={item}
                key={item}
              />
            ))}
            <RecipeSearchButton
              onClick={this.handleClick}
              className="recipe-search-button"
            >
              Search Recipes
            </RecipeSearchButton>
          </Ingredients>
        ) : null}
        {!this.props.soClose &&
        !this.props.recipes &&
        this.props.loaded === true ? (
          <h2>I couldnt find anything, try adding more ingredients!</h2>
        ) : null}
        {this.props.error ? (
          <div>
            <h2>It's not you, it's me.</h2> <h2>I have there is an error.</h2>
          </div>
        ) : null}
      </SearchBarForm>
    );
  }
}

export default Search;
