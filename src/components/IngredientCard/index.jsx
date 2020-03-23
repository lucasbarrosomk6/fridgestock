import React, { Component } from "react";
import { IngredientContainer, IngredientRemove } from "./styles";

class IngredientCard extends Component {
  state = {
    ishovering: false
  };
  handleClick = () => this.props.remove(this.props.name);

  render() {
    const { name } = this.props;
    return (
      <IngredientContainer className="ingredient-container">
        <div>{name}</div>
        <IngredientRemove
          className="ingredient-remove"
          onClick={this.handleClick}
        >
          X
        </IngredientRemove>
      </IngredientContainer>
    );
  }
}

export default IngredientCard;
