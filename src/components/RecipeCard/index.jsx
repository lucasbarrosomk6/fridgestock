import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Container,
  RecipeImage,
  InfoContainer,
  Title,
  IngredientsContainer,
  Ingredients
} from "./styles";

class Recipe extends Component {
  state = {
    hover: false
  };
  toggleHover = () => this.setState({ hover: !this.state.hover });

  handleSetIngredients = () => {
    localStorage.setItem(
      "missedIngredients",
      JSON.stringify(this.props.missedIngredients)
    );
  };

  render() {
    const { recipe, match } = this.props;
    const { image, title, missedIngredients, usedIngredients, id } = recipe;

    return (
      <Link
        to={`${match.url}recipe/${id}`}
        style={{ width: "100%", height: "fit-content" }}
      >
        <Container
          className="recipe"
          onClick={this.handleSetIngredients}
          onMouseEnter={this.toggleHover}
          onMouseLeave={this.toggleHover}
        >
          <RecipeImage className="recipe-image" image={image} alt="title" />
          <InfoContainer className="info-container">
            <Title className="recipe-title">{title}</Title>
            <IngredientsContainer className="ingredient-container">
              <Ingredients className="used-ingredients">
                <h3>Used</h3>
                {!this.state.hover || !usedIngredients.length ? (
                  <h1>{usedIngredients.length}</h1>
                ) : (
                  usedIngredients.map(item => (
                    <h1 key={item.name}>{item.name}</h1>
                  ))
                )}
              </Ingredients>
              <Ingredients className="missed-ingredients">
                <h3>missing</h3>
                {!this.state.hover || !missedIngredients.length ? (
                  <h1>{missedIngredients.length}</h1>
                ) : (
                  missedIngredients.map(item => (
                    <h1 key={item.name}>{item.name}</h1>
                  ))
                )}
              </Ingredients>
            </IngredientsContainer>
          </InfoContainer>
        </Container>
      </Link>
    );
  }
}

export default withRouter(Recipe);
