import React from "react";
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent, CardActions } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardPieChart from "./CardPieChart";
import { MDBBtn } from "mdbreact";
import Chip from "@material-ui/core/Chip";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";

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
  console.log(id);
  return (
    <Card className={classes.root}>
      <CardHeader title={title} />
      <CardMedia
        className={classes.media} // put recipe image here
        image={image}
        title={title}
      />
      <CardContent>
        <CardPieChart
          missedIngredients={missedIngredients.length}
          usedIngredients={usedIngredients.length}
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

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
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {!!usedIngredients.length && <Typography paragraph>Have:</Typography>}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {!!usedIngredients.length &&
              usedIngredients.map((item, index) => (
                <div style={{ margin: "5px 3px" }} key={index}>
                  <ThemeProvider theme={theme}>
                    <Chip
                      label={item.name}
                      className={`ingredientChip ${item}`}
                      color="primary"
                    />
                  </ThemeProvider>
                </div>
              ))}
          </div>

          {!!missedIngredients.length && (
            <Typography paragraph>Need:</Typography>
          )}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {" "}
            {!!missedIngredients.length &&
              missedIngredients.map((item, index) => (
                <div style={{ margin: "5px 3px" }} key={index}>
                  <ThemeProvider theme={theme}>
                    <Chip
                      label={item.name}
                      className={`ingredientChip ${item}`}
                      color="secondary"
                    />
                  </ThemeProvider>
                </div>
              ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default withRouter(RecipeCard);
