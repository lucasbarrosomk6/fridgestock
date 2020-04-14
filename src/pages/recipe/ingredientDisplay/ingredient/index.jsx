import React, { Component } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
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
  handleSubmit = () => {
    this.props.handleIngredientChange(
      this.state.quantityField,
      this.props.ingredient.measures.us.amount
    );
    this.toggleOff();
  };
  render() {
    const { ingredient, location, history, match, index } = this.props;
    const { loading, quantityField } = this.state;
    const { setLoading, setSimilarIngredients } = this;
    const us = ingredient.measures.us;

    // const fetchSimilarIngredients = async ingredient => {
    //   setLoading(true);
    //   const data = await api(`food/ingredients/${ingredient.id}/substitutes`);
    //   setLoading(false);
    //   data.substitutes &&
    //     setSimilarIngredients(
    //       data.substitutes.map(ingredient => ({
    //         value: ingredient,
    //         label: ingredient
    //       }))
    //     );
    // };

    // const parsed = queryString.parse(location.search);

    // const handleSelect = data => {
    //   const parsed = queryString.parse(location.search);
    //   parsed[ingredient.name] = data.value;

    //   const stringified = queryString.stringify(parsed);

    //   console.log(stringified);
    //   history.push(`${match.url}?${stringified}`);
    // };\
    if (loading || !ingredient) return;

    return (
      <IngredientContainer className="Ingredient">
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
          </MDBModalFooter>
        </MDBModal>
      </IngredientContainer>
    );
  }
}
export default withRouter(Ingredient);
