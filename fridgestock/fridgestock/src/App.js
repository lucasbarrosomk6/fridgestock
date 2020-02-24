import React, { Component } from "react";
import { BrowserRouter as Router, Switch,Route,link} from "react-router-dom"
import Fridgestock from "./components/pages/fridgestock/fridgestock.page";
import Recipe from "./components/pages/recipe/recipe.page"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
        <Route exact path="/" component={Fridgestock} />
        <Route exact path="/recipe/:recipeId" component={Recipe}/>
      </Switch>
        </Router>
       
      </div>
    );
  }
}

export default App;
