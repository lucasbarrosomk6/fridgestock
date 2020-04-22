import React from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent, CardActions } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChipDisplay from "components/ChipDisplay";
import { MDBBtn } from "mdbreact";
import { createMuiTheme } from "@material-ui/core/styles";
import { Ingredients } from "./styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#46BFBD",
      main: "#46BFBD",
      dark: "#5AD3D1",
    },
    secondary: {
      light: "#FDDAE1",
      main: "#FDDAE1",
      dark: "#FA8BA2",
    },
  },
});

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media} // put recipe image here
        image={image}
        title={title}
      />
      <CardHeader title={title} />
      <CardContent
        style={{ display: "flex", flexWrap: "wrap", overflowY: "scroll" }}
      >
        <ChipDisplay
          data={[...usedIngredients].map((Ingredient) => ({
            ...Ingredient,
            isMissing: false,
          }))}
        />
        <ChipDisplay
          data={[...missedIngredients].map((Ingredient) => ({
            ...Ingredient,
            isMissing: true,
          }))}
        />
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/recipe/${id}`}>
          <MDBBtn>See Full Recipe</MDBBtn>
        </Link>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></IconButton>
      </CardActions>
    </Card>
  );
}
export default withRouter(RecipeCard);
