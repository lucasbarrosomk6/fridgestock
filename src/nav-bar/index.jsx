import React, { Component } from "react";
import { Link } from "react-router-dom";

import { NavBarContainer, Title, NavigationContainer } from "./styles";

class NavBar extends Component {
  render() {
    return (
      <NavBarContainer className="navbar-container">
        <Link to="/">
          <Title className="Title">
            <h1>FridgeStock</h1>
            <div>The food at home can be pretty good</div>
          </Title>
        </Link>

        <NavigationContainer></NavigationContainer>
      </NavBarContainer>
    );
  }
}

export default NavBar;
