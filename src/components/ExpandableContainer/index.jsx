import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../redux/user/user.selector";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Collapse } from "react-collapse";
import {
  Container,
  TitleContainer,
  CloseContainer,
  IngredientProgress,
} from "./styles";
import { MDBIcon } from "mdbreact";
import "react-circular-progressbar/dist/styles.css";

class ExpandableContainer extends Component {
  state = {
    clicked: this.props.clicked,
  };
  handleClick = () => this.setState({ clicked: !this.state.clicked });

  componentDidMount() {}

  render() {
    const { title, children, fridgeStock, ingredients } = this.props;
    const { clicked } = this.state;
    const percentage =
      ingredients &&
      fridgeStock &&
      Math.floor(
        (this.props.fridgeStock.filter((item) =>
          ingredients.map((item) => item.name).includes(item)
        ).length /
          ingredients.length) *
          100
      );
    return (
      <Container className="ingredient-container">
        <TitleContainer>
          {title === "Ingredients" && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: "1",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <MDBIcon icon="apple-alt" size="2x" />
                  <h1 style={{ margin: "0 0 0 5px" }}>Ingredients</h1>
                </div>

                <IngredientProgress>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({ textSize: "2rem" })}
                  />
                </IngredientProgress>
              </div>
            </>
          )}
          {title === "instructions" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MDBIcon icon="list-alt" size="2x" />
              <h1 style={{ margin: "0 0 5px 5px" }}>Instructions</h1>
            </div>
          )}
          {title === "information" && <h1>Information</h1>}
          <CloseContainer onClick={() => this.handleClick()} clicked={clicked}>
            <MDBIcon icon="angle-up" />
          </CloseContainer>
        </TitleContainer>
        <Collapse isOpened={clicked}>{children}</Collapse>
      </Container>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});

export default connect(mapStateToProps)(ExpandableContainer);
