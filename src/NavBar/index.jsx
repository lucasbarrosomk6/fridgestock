import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBarPrototype extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Navbar bg="light" id="nav" expand="lg" sticky="top">
        <Link to="/">
          <Navbar.Brand>
            <strong>FridgeStock</strong>
          </Navbar.Brand>
        </Link>
      </Navbar>
    );
  }
}

export default NavBarPrototype;
