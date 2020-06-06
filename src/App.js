import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import FridgeStock from "./Pages/FridgeStock";
import Recipe from "./Pages/Recipe";
import NavBar from "./NavBar";
import "./App.css";
import Theme from "./styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: Theme.lightBlue,
      main: Theme.lightBlue,
      dark: Theme.darkBlue,
    },
    secondary: {
      main: Theme.red,
    },
  },
  danger: Theme.red,
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={FridgeStock} />
              <Route exact path="/recipe/:recipeId" component={Recipe} />
              <Route path="*" component={() => <div>Not found</div>} />
              {/*the :recipeId key is how I determine which individual recipe is fetched*/}
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
