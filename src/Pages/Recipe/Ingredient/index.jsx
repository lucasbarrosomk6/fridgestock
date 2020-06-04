import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import {
  IngredientContainer,
  NameContainer,
  QuantityContainer,
  OptionContainer,
  Circle,
} from "./styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../../../redux/user/user.selector";
import { addToFridgeStock } from "../../../redux/user/user.actions";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarIngredients: [],
      loading: false,
      modal: false,
      quantityField: "",
    };
  }

  setSimilarIngredients = (x) => this.setState({ similarIngredients: x });
  setLoading = (x) => this.setState({ loading: x });
  toggleOn = () => this.setState({ modal: true });
  toggleOff = () => this.setState({ modal: false });
  handleChange = (e) => this.setState({ quantityField: e.target.value });
  handleAdd = (x) => this.props.setIngredients(x);
  handleSubmit = () => {
    this.state.quantityField &&
      this.props.handleIngredientChange(
        this.state.quantityField,
        this.props.ingredient.measures.us.amount
      );
    this.toggleOff();
  };

  render() {
    const { ingredient, widths, fridgeStock } = this.props;
    const { loading, quantityField } = this.state;
    const isMissing = !fridgeStock.includes(ingredient.name);

    const us = ingredient.measures.us;

    if (loading || !ingredient) return;
    return (
      <IngredientContainer className="Ingredient">
        <Circle missing={isMissing} />
        <QuantityContainer
          id="QuantittyContainer"
          width={widths}
        >{`${us.amount} ${us.unitShort}`}</QuantityContainer>

        <NameContainer className="name-container" width={widths}>
          {ingredient.name}
          <OptionContainer onClick={this.toggleOn}>
            <MDBIcon icon="ellipsis-v" />
          </OptionContainer>
        </NameContainer>

        <MDBModal isOpen={this.state.modal} toggle={this.toggleOff} centered>
          <MDBModalHeader toggle={this.toggleOff}>
            Change Ingredient Quantity
          </MDBModalHeader>
          <MDBModalBody>
            <p>This will change the quantity of all other ingredients</p>
            <MDBInput
              value={quantityField}
              onChange={this.handleChange}
              label={ingredient.measures.us.amount + " " + us.unitShort}
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.handleSubmit}>
              Save changes
            </MDBBtn>
            {isMissing && (
              <MDBBtn
                color="secondary"
                onClick={() => this.props.addToFridgeStock(ingredient.name)}
              >
                I have this Ingredient
              </MDBBtn>
            )}
          </MDBModalFooter>
        </MDBModal>
      </IngredientContainer>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});
const mapDispatchToProps = (dispatch) => ({
  addToFridgeStock: (item) => dispatch(addToFridgeStock(item)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Ingredient));
