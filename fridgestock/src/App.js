import React, { Component } from "react";
import axios from "axios";
import Fridgestock from "./components/pages/fridgestock/fridgestock.page";

class App extends Component {
  state = {
    recipes: []
  };
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <Fridgestock />
      </div>
    );
  }
}

export default App;
