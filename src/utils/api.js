import axios from "axios";

//how do I specify one argument in the function call?

// function(examplePath, exampleQuery, ignorePantry) but skip over "id" and "numberOfResults"

export default async (path, config = {}) => {
  const dynamicQuery = Object.keys(config)
    .map(key => key + "=" + config[key])
    .join("&");

  const baseLink =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/";
  const url = `${baseLink}${path}?${dynamicQuery}`;
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

// let dynamicPath;
// switch (path) {
//   case path === "autoComplete":
//     dynamicPath = "food/ingredients/autocomplete?";
//     break;
//   case path === "fridgeStockSearch":
//     dynamicPath = "recipes/findByIngredients?";
//     break;

//   default:
//     dynamicPath = path;
// }
