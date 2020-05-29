import React from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent, CardActions } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ChipDisplay from "components/ChipDisplay";
import { MDBBtn } from "mdbreact";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export function RecipeCard({ recipe, match }) {
  const { image, title, usedIngredients, missedIngredients, id } = recipe;
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ width: "300px" }}>
      <CardMedia
        className={classes.media} // put recipe image here
        image={image}
        title={title}
      />
      <CardHeader title={title} />
      <CardContent
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <ChipDisplay
          data={
            usedIngredients
              ? [...usedIngredients].map((Ingredient) => ({
                  ...Ingredient,
                  isMissing: false,
                }))
              : null
          }
        />
        <ChipDisplay
          data={
            missedIngredients[0].id
              ? [...missedIngredients].map((Ingredient) => ({
                  ...Ingredient,
                  isMissing: true,
                }))
              : missedIngredients
          }
        />
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/recipe/${id}`} style={{ width: "100%" }}>
          <MDBBtn style={{ width: "100%" }}>See Full Recipe</MDBBtn>
        </Link>
      </CardActions>
    </Card>
  );
}
export default withRouter(RecipeCard);
