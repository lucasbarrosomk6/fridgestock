fetchRecipe = async () => {
  try {
    this.setState({ loading: false });
    console.log("fetch started");
    const { data } = await axios({
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.state.recipeId}/information`,
      method: "get",
      headers: {
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": `${key}`
      }
    });
    this.setState({ recipe: data });
    this.setState({ instructions: data.analyzedInstructions[0].steps });
    console.log("fetch completed");
  } catch (error) {
    this.setState({ loading: false, error: true });
    console.log("there was an error", error);
  }
};
