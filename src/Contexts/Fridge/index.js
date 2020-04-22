import React from "react";
import { setIngredients, removeIngredient } from "utils/setIngredients";
import { getLocalStorage } from "utils/localStorage";

export const FridgeContext = React.createContext({});

export function withFridge(Component) {
  return class extends React.Component {
    render() {
      return (
        <FridgeContext.Consumer>
          {(data) => <Component {...this.props} {...data} />}
        </FridgeContext.Consumer>
      );
    }
  };
}

export class Fridge extends React.Component {
  state = {
    ingredients: [],
  };

  componentDidMount() {
    this.setState({
      ingredients: getLocalStorage("ingredients") || [],
    });
  }

  setIngredients = (ingredient) => {
    console.log(this.state.ingredients);
    const ingredients = setIngredients(ingredient, this.state.ingredients);

    this.setState({ ingredients });
  };
  removeIngredient = (ingredient) =>
    this.setState({
      ingredients: removeIngredient(ingredient, this.state.ingredients),
    });
  render() {
    return (
      <FridgeContext.Provider
        value={{
          ingredients: this.state.ingredients,
          setIngredients: this.setIngredients,
          removeIngredient: this.removeIngredient,
        }}
      >
        {this.props.children}
      </FridgeContext.Provider>
    );
  }
}
