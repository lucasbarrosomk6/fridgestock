import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.color};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 2vw;
  width: 90%;
  height: ${props => (props.clicked ? "auto" : "20vh")};
  max-width: 400px;
  margin: 2%;
  overflow: hidden;
  transition: all 0.5s;
  &:hover {
    background: purple;
  }
`;

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      clicked: false
    };
  }
  assignColor = id => {
    let num = parseFloat(id.toString().slice(-1));
    let color;
    switch (num) {
      case 1:
        color = "#861657";
        break;
      case 2:
        color = "#A64253";
        break;
      case 3:
        color = "#D56AA0";
        break;
      case 4:
        color = "#B7B5E4";
        break;
      case 5:
        color = "#861657";
        break;
      case 6:
        color = "#A64253";
        break;
      case 7:
        color = "#D56AA0";
        break;
      case 8:
        color = "#D3D0CB";
        break;
      case 9:
        color = "#FCF0CC";
        break;
      default:
        color = "#1F2041";
        break;
    }
    return color;
  };
  handleHover = () => {
    this.setState({ hover: !this.state.hover });
  };
  handleClick = () => this.setState({ clicked: !this.state.clicked });
  fetchInstructions;
  render() {
    const { title, image, id, missed, used } = this.props;
    const backColor = this.assignColor(id);
    let recipeStyle = {
      backgroundColor: backColor,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "2vw",
      width: "90%",
      height: "20vh",
      maxWidth: "400px",
      margin: "2%",
      overflow: "hidden",
      transition: "all .5s"
    };
    if (this.state.hover) recipeStyle.boxShadow = "2px 2px 2px black";
    if (this.state.clicked) {
      recipeStyle.height = "50vh";
      console.log(title, "was clicked");
    }

    return (
      <Container
        color={backColor}
        className={`fridgestock-recipe`}
        clicked={this.state.clicked}
        id={id}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
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
            <h3>ingredients</h3>
            <div className="ingredients-missed">
              <h5>missing</h5>
              <ul>
                {missed.length
                  ? missed.map(ingredient => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))
                  : null}
              </ul>
            </div>
            <div className="ingredients-used">
              <h5>used</h5>
              <ul>
                {used.length
                  ? used.map(ingredient => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        )}
      </Container>
    );
  }
}

export default Recipe;
