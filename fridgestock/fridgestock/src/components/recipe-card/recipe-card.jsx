import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  position: relative;
  background-color: ${props => props.backColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 2vw;
  width: 90%;
  height: ${props => (props.clicked ? "40vh" : "20vh")};
  max-width: 400px;
  margin: 2%;
  overflow: hidden;
  transition: all 0.5s;
  &:hover {
    box-shadow: 2px 2px 2px black;
  }
`;
const Ingredients = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 90%;
`;
const IngredientShowcase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 3%;
  text-align: center;
  border-right: ${props => props.missedIngredients && "1px solid black"};
`;
const FullRecipe = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50%;
  height: 3vh;
  border-top: 2px solid black;
  background-color: lightblue;
  padding: 1vh;
`;
class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      clicked: false,
      missedIngredients: [this.props.recipe.missedIngredients]
    };
  }
  handleClick = () => this.setState({ clicked: !this.state.clicked });

  render() {
    const { recipe, match, history } = this.props;
    const { image, title, missedIngredients, usedIngredients, id } = recipe;
    let colors = ["#861657", "#A64253", "#D56AA0", "#FCF0CC"];
    console.log("recipe has rendered");
    return (
      <Container
        className={`fridgestock-recipe`}
        clicked={this.state.clicked}
        id={id}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
        backColor={colors[Math.floor(Math.random() * colors.length)]}
      >
        <img
          src={image}
          alt={title}
          style={{
            marginTop: "3%",
            height: "auto",
            width: "15vh",
            borderRadius: "50vh"
          }}
        />
        <h4 style={{ margin: ".5em 0" }}>{title}</h4>
        {this.state.clicked && (
          <div className="recipe-expanded">
            <h3>ingredients</h3>
            <Ingredients>
              {missedIngredients.length ? (
                <IngredientShowcase
                  className="ingredients-missed"
                  missedIngredients={this.state.missedIngredients}
                >
                  <h5>missing</h5>
                  {missedIngredients.map(ingredient => (
                    <p key={ingredient.id}>{ingredient.name}</p>
                  ))}
                </IngredientShowcase>
              ) : null}
              {usedIngredients.length ? (
                <IngredientShowcase className="ingredients-used">
                  <h5>used</h5>
                  {usedIngredients.map(ingredient => (
                    <p key={ingredient.id}>{ingredient.name}</p>
                  ))}
                </IngredientShowcase>
              ) : null}
            </Ingredients>
          </div>
        )}

        <FullRecipe onClick={() => history.push(`${match.url}recipe/${id}`)}>
          View Full recipe
        </FullRecipe>
      </Container>
    );
  }
}

export default withRouter(Recipe);
