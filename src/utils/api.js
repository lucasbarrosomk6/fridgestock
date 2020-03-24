import axios from "axios";

//how do I specify one argument in the function call?

// function(examplePath, exampleQuery, ignorePantry) but skip over "id" and "numberOfResults"
export default async (
  path,
  query = "",
  id = "",
  numberOfResults = 5,
  ignorePantry = true
) => {
  let dynamicPath;
  let dynamicQuery;
  switch (path) {
    case path === "autoComplete":
      dynamicPath = "food/ingredients/autocomplete?";
      dynamicQuery = `query=${query}`;
      break;
    case path === "fridgeStockSearch":
      dynamicPath = "recipes/findByIngredients?";
      dynamicQuery = `query=number=${numberOfResults}&ranking=1&ignorePantry=${ignorePantry}&ingredients=${query}`;
      break;
    case path === "recipePageSearch":
      dynamicPath = `recipes/${id}/information`;
      dynamicQuery = query;
      break;
    default:
      dynamicPath = path;
  }
  const baseLink =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/";
  const url = `${baseLink}${dynamicPath}${dynamicQuery}`;
  console.log(url);
  let { data } = await axios({
    url: url,
    method: "get",
    headers: {
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
    }
  });

  console.log(url);
  return data;
};

// fridgeStockSearch
// let { data } = await axios({
//   url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=2&ignorePantry=true&ingredients=${ingredientQueryString}`,
//   method: "get",
//   headers: {
//     "X-RapidAPI-Host":
//       "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//     "X-RapidAPI-Key": process.env.REACT_APP_API_KEY
//   }
// });
