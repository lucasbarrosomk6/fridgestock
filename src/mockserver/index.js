const express = require("express");
const app = express();
const cors = require("cors");
const recipe = require("./fixtures/recipe.json");
const recipes = require("./fixtures/recipes.json");
const autocomplete = require("./fixtures/autocomplete.json");
app.use(cors());

app.get("/recipes/findByIngredients", (req, res) => {
  res.json(recipes);
});

app.get("/recipes/:id/information", (req, res) => {
  res.json(recipe);
});
app.get("/food/ingredients/autocomplete", (req, res) => {
  res.json(autocomplete);
});
app.listen(5000, () => console.log("APP is rUnNing"));
