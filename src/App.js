import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import FridgeStock from "./Pages/FridgeStock";
import Recipe from "./Pages/Recipe";
import NavBar from "./NavBar";
import { Fridge } from "./Contexts/Fridge";
import "./App.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5ad3d1",
      main: "#5ad3d1",
      dark: "#FA8BA2",
    },
    secondary: {
      light: "#FDDAE1",
      main: "#FA8BA2",
      dark: "#FA8BA2",
    },
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Fridge>
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
        </Fridge>
      </div>
    );
  }
}

export default App;
