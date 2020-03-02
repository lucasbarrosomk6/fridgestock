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
  background-image: url("https://storage.needpix.com/rsynced_images/metal-316803_1280.jpg");
  background-size: cover;
  box-shadow: 2px 2px 3px black;
`;
const SearchBarForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20%;
`;
const SearchBar = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 150%;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  border-radius: 1vh;
  box-shadow: 1px 1px 4px black;
  &:focus {
    outline: none;
  }
`;
const AutoComplete = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: fit-content;
  min-height: 5vh;
  max-height: 10vh;
`;
const AutoCompleteItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: 100px;
  max-width: 150px;
  height: 3vh;
  border: grey solid 1px;
  border-radius: 1vw;
  background-color: rgb(211, 211, 211, 0.5);
  box-shadow: 1px 2px 2px black;
  padding: 0 3px;
  font-size: 1.7vw;
  cursor: pointer;
`;
const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 300px;
  height: 20%;
  background-image: url("https://p0.pxfuel.com/preview/764/285/247/texture-brushed-steel-background.jpg");
  background-size: 400px;
  background-repeat: no-repeat;
  border-radius: 15vh;
  box-shadow: 1px 1px 4px black;
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
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=8&query=${this.state.searchField}`,

        method: "get",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
        }
      });
      console.log(data);
      this.setState({ autoComplete: data });
      console.log(this.state.autoComplete);
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
          <SearchBar
            onChange={this.handleChange}
            value={searchField}
            placeholder="Search for Ingredients here"
          />
        </SearchBarForm>
        <AutoComplete>
          {autoComplete
            ? autoComplete.map((ingredient, index) => (
                <AutoCompleteItem
                  key={index}
                  onClick={() => this.handleAutocompleteSelect(ingredient.name)}
                >
                  {ingredient.name}
                </AutoCompleteItem>
              ))
            : null}
        </AutoComplete>
        <SearchButton onClick={this.handleClick}>Search Recipes</SearchButton>
      </Container>
    );
  }
}

export default Search;
