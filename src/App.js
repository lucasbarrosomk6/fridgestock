import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FridgeStock from "./Pages/FridgeStock";
import Recipe from "./Pages/Recipe";
import NavBar from "./NavBar";
import "./App.css";
import NavBarProtoType from "./NavBar/NavBarProtoType";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={NavBar} />
          <Switch>
            <Route exact path="/" component={FridgeStock} />
            <Route exact path="/recipe/:recipeId" component={Recipe} />
            <Route path="*" component={() => <div>Not found</div>} />
            {/*the :recipeId key is how I determine which individual recipe is fetched*/}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
