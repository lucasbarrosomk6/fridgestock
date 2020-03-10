import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FridgeStock from "./pages/FridgeStock";
import Recipe from "./pages/recipe";
import NavBar from "./nav-bar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={NavBar} />
          <Switch>
            <Route exact path="/" component={FridgeStock} />
            <Route exact path="/recipe/:recipeId" component={Recipe} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
