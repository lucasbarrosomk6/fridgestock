import React, { Component } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import IngredientOptions from "./QuantityPopup";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import {
  IngredientContainer,
  NameContainer,
  QuantityContainer,
} from "./styles";
import Popup from "reactjs-popup";
import api from "utils/api";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarIngredients: [],
      loading: false,
      quantity: this.props.ingredient.measures.us.amount,
      modal: false,
    };
  }

  setSimilarIngredients = (x) => this.setState({ similarIngredients: x });
  setLoading = (x) => this.setState({ loading: x });
  setQuantity = (x) => this.setState({ quantity: x });
  toggleOn = () => this.setState({ modal: true });
  toggleOff = () => this.setState({ modal: false });
  render() {
    const { ingredient, location, history, match } = this.props;
    const { loading, quantity } = this.state;
    const { setLoading, setQuantity, setSimilarIngredients } = this;
    const us = ingredient.measures.us;
    console.log("render");

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
    // };
    if (loading) return;
    return (
      <IngredientContainer className="Ingredient">
        <QuantityContainer id="QuantittyContainer">{`${quantity} ${us.unitShort}`}</QuantityContainer>

        <NameContainer onClick={this.toggleOn}>{ingredient.name}</NameContainer>

        <MDBModal isOpen={this.state.modal} toggle={this.toggleOff}>
          <MDBModalHeader toggle={this.toggleOff}>
            MDBModal title
          </MDBModalHeader>
          <MDBModalBody>
            <h1>HI</h1>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>
              Close
            </MDBBtn>
            <MDBBtn color="primary">Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </IngredientContainer>
    );
  }
}
export default withRouter(Ingredient);
