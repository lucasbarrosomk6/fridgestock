import React, { Component } from "react";
import { MDBInput, MDBIcon } from "mdbreact";
import { debounce } from "lodash";
import api from "utils/api";
import {
  SearchBar,
  SearchBarForm,
  AutoCompleteItem,
  Ingredients,
  RecipeSearchButton,
  AutoCompleteDisplay,
} from "./styles";

class AutoComplete extends Component {
  state = {
    autoComplete: [],
    searchField: "",
  };

  handlesubmit = (e) => {
    e.preventDefault();

    this.props.setIngredients(this.state.searchField);
    this.setState({
      autoComplete: [],
      searchField: "",
      doIngredientsExist: true,
    });
  };
  handleAutocompleteSelect = (x) => {
    this.props.setIngredients(x);

    this.setState({
      searchField: "",
      autoComplete: [],
      buttonClicked: false,
    });
  };

  handleClick = () => {
    this.props.fetchRecipes().then(this.setState({ buttonClicked: true }));
    this.setState({ searchField: "" });
  };
  handleChange = (e) => {
    this.setState({ searchField: e.target.value, autoComplete: [] });
    this.fetchAutoComplete();
    !this.state.searchField.length && this.setState({ autoComplete: [] });
  };
  fetchAutoComplete = debounce(async () => {
    console.log("autocomplete triggered");
    this.setState({ isSearching: true });
    const data = await api("food/ingredients/autocomplete", {
      query: this.state.searchField,
      number: 5,
    });
    this.setState({ autoComplete: data, isSearching: false });
  }, 700);

  render() {
    return (
      <SearchBarForm
        onSubmit={this.handlesubmit}
        className="searchForm"
        autoComplete="off"
      >
        <SearchBar>
          <MDBInput
            value={this.state.searchField}
            onChange={this.handleChange}
            label="Enter ingredients here"
          />
          <MDBIcon icon="search" />
        </SearchBar>

        <AutoCompleteDisplay
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
        </AutoCompleteDisplay>
      </SearchBarForm>
    );
  }
}

export default AutoComplete;
