import React from "react";
import AutoComplete from "./AutoComplete";
import { Ingredients } from "./styles";
import Chip from "@material-ui/core/Chip";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { MDBBtn } from "mdbreact";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5ad3d1",
      main: "#5ad3d1",
      dark: "#FA8BA2",
    },
  },
});

const Search = ({
  ingredients,
  setIngredients,
  removeIngredient,
  fetchRecipes,
  isLoading,
}) => {
  return (
    <>
      <AutoComplete className="autocomplete" setIngredients={setIngredients} />
      <Ingredients className="ingredientDisplay">
        {!!ingredients.length &&
          ingredients.map((item) => (
            <div style={{ margin: "5px 3px" }} key={item}>
              <ThemeProvider theme={theme}>
                <Chip
                  label={item}
                  onDelete={() => removeIngredient(item)}
                  className={`ingredientChip ${item}`}
                  color="primary"
                />
              </ThemeProvider>
            </div>
          ))}
      </Ingredients>
    </>
  );
};
export default Search;
