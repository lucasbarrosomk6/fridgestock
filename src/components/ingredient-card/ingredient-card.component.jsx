import React, { Component } from "react";
import styled from "styled-components";

class IngredientCard extends Component {
  state = {
    ishovering: false
  };
  handleClick = () => this.props.remove(this.props.name);

  render() {
    const IngredientContainer = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20%;
      max-height: 60px;
      text-align: center;
      width: 95%;
      margin: 1% 2.5%;
      padding: 1% 4%;
      font-size: 150%;
      border: grey solid 1px;
      border-radius: 1vw;
      background-color: rgb(211, 211, 211);
      cursor: pointer;
      transition: all 0.5s;
      background-image: url("https://storage.needpix.com/rsynced_images/metal-316803_1280.jpg");
      box-shadow: 1px 2px 2px black;
    `;
    const IngredientRemove = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
      min-width: 100px;
      height: 3vh;
      border: grey solid 1px;
      border-radius: 1vw;
      background-color: rgb(211, 211, 211, 0.5);
      font-size: 70%;
      box-shadow: 1px 2px 2px black;
    `;
    const { name } = this.props;
    return (
      <IngredientContainer>
        <div>{name}</div>
        <IngredientRemove onClick={this.handleClick}>Remove</IngredientRemove>
      </IngredientContainer>
    );
  }
}

export default IngredientCard;
