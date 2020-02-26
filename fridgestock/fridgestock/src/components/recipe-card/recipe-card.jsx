import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.backColor};
  display: flex;
  justify-content: flex-start;
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
  align-items: center;
`;
class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      clicked: false
    };
  }
  handleClick = () => this.setState({ clicked: !this.state.clicked });
  fetchInstructions;
  render() {
    const { recipe, match, history, id } = this.props;
    const { image, title, missedIngredients, usedIngredients } = recipe;
    let colors = ["#861657", "#A64253", "#D56AA0", "#FCF0CC"];

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
        <h4>{title}</h4>
        {this.state.clicked && (
          <div className="recipe-expanded">
            <Ingredients>
              <h3>ingredients</h3>
              <div className="ingredients-missed">
                <h5>missing</h5>
                <ul>
                  {missedIngredients.length
                    ? missedIngredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                      ))
                    : null}
                </ul>
              </div>
              <div className="ingredients-used">
                <h5>used</h5>
                <ul>
                  {usedIngredients.length
                    ? usedIngredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                      ))
                    : null}
                </ul>
              </div>
            </Ingredients>

            <div onClick={() => history.push(`${match.url}recipe/${id}`)}>
              View Full recipe
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default Recipe;
