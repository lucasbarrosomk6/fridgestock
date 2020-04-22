import React, { Component } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { withFridge } from "../../../../Contexts/Fridge";
import {
  MDBContainer,
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
} from "./styles";
import api from "utils/api";

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
    this.props.handleIngredientChange(
      this.state.quantityField,
      this.props.ingredient.measures.us.amount
    );
    this.toggleOff();
  };

  render() {
    const { ingredient } = this.props;
    const { loading, quantityField } = this.state;
    console.log(this.props.ingredients);

    const us = ingredient.measures.us;

    if (loading || !ingredient) return;
    return (
      <IngredientContainer
        missing={ingredient.isMissing}
        className="Ingredient"
      >
        <QuantityContainer id="QuantittyContainer">{`${ingredient.measures.us.amount} ${us.unitShort}`}</QuantityContainer>

        <NameContainer>
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
            <MDBBtn color="secondary" onClick={this.toggleOff}>
              Close
            </MDBBtn>
            <MDBBtn color="primary" onClick={this.handleSubmit}>
              Save changes
            </MDBBtn>
            <MDBBtn
              color="secondary"
              onClick={() => this.handleAdd(ingredient.name)}
            >
              I have this Ingredient
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </IngredientContainer>
    );
  }
}
export default withFridge(withRouter(Ingredient));
