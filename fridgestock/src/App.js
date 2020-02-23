import React, { Component } from "react";
<<<<<<< HEAD
import axios from "axios";
import Fridgestock from "./components/pages/fridgestock/fridgestock.page";

class App extends Component {
  state = {
    recipes: []
  };
  componentDidMount() {}

=======
import Fridgestock from "./components/pages/fridgestock/fridgestock.page";

class App extends Component {
>>>>>>> 26ff73c5255c3ddd70632f38b39d7a9525e8e057
  render() {
    return (
      <div className="App">
        <Fridgestock />
      </div>
    );
  }
}

export default App;
