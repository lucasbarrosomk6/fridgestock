import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  height: 15vh;
  background-color: lightgrey;
`;
const SearchBarForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20%;
  background-color: blue;
`;
const SearchBar = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 150%;
  background-color: red;
`;
const AutoComplete = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 30%;
  background-color: pink;
`;
const AutoCompleteItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0.5%;
  flex: 1;
  cursor: pointer;
`;
const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 300px;
  height: 20%;
  background-color: green;
  cursor: pointer;
`;
class Search extends Component {
  state = {
    error: false,
    searchField: "",
    autoComplete: []
  };
  handlesubmit = e => {
    e.preventDefault();
    this.props.setIngredients(this.state.searchField);
    this.setState({ searchField: "" });
  };
  handleAutocompleteSelect = x => {
    this.props.setIngredients(x);
    this.setState({ searchField: "", autoComplete: [] });
  };
  handleChange = e => {
    this.setState({ searchField: e.target.value });
    this.state.searchField.length > 2 && this.autoComplete();
  };
  handleClick = () => {
    this.props.fetchRecipes();
    this.setState({ searchField: "" });
  };
  autoComplete = async () => {
    console.log("autoComplete triggered");
    try {
      this.setState({ error: false });
      const { data } = await axios({
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autoComplete?number=10&query=${this.state.searchField}`,
        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
        }
      });
      this.setState({ autoComplete: data });
    } catch (error) {
      this.setState({
        error: true,
        autoComplete: ["error"]
      });
      console.log(error);
    }
    console.log(this.state);
  };
  render() {
    const { searchField, autoComplete } = this.state;
    return (
      <Container>
        <SearchBarForm onSubmit={this.handlesubmit}>
          <SearchBar onChange={this.handleChange} value={searchField} />
        </SearchBarForm>
        <AutoComplete>
          {autoComplete &&
            autoComplete.map((ingredient, index) => (
              <AutoCompleteItem
                key={index}
                onClick={() => this.handleAutocompleteSelect(ingredient)}
              >
                {ingredient}
              </AutoCompleteItem>
            ))}
        </AutoComplete>
        <SearchButton onClick={this.handleClick}>Search Recipes</SearchButton>
      </Container>
    );
  }
}

export default Search;
