import axios from "axios";

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
  return data;
};
