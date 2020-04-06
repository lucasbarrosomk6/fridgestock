import React, { Component } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import IngredientOptions from "./QuantityPopup";

import {
  IngredientContainer,
  NameContainer,
  QuantityContainer
} from "./styles";
import Popup from "reactjs-popup";
import api from "utils/api";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarIngredients: [],
      loading: false,
      quantity: this.props.ingredient.measures.us.amount
    };
    this.trigger = React.createRef();
    // this.getElementWidth = this.getElementWidth.bind(this);
  }
  componentDidMount() {
    this.props.logWidth(this.trigger.current.clientWidth);
  }
  setSimilarIngredients = x => this.setState({ similarIngredients: x });
  setLoading = x => this.setState({ loading: x });
  setQuantity = x => this.setState({ quantity: x });

  render() {
    const { ingredient, location, history, match } = this.props;
    const { loading, quantity } = this.state;
    const { setLoading, setQuantity, setSimilarIngredients } = this;
    const us = ingredient.measures.us;
    const trigger = React.createRef();
    const quantityWidth =
      this.trigger.current && this.trigger.current.clientWidth;
    console.log("render");
    console.log(this.trigger.current);

    const fetchSimilarIngredients = async ingredient => {
      setLoading(true);
      const data = await api(`food/ingredients/${ingredient.id}/substitutes`);
      setLoading(false);
      data.substitutes &&
        setSimilarIngredients(
          data.substitutes.map(ingredient => ({
            value: ingredient,
            label: ingredient
          }))
        );
    };

    const parsed = queryString.parse(location.search);

    const handleSelect = data => {
      const parsed = queryString.parse(location.search);
      parsed[ingredient.name] = data.value;

      const stringified = queryString.stringify(parsed);

      console.log(stringified);
      history.push(`${match.url}?${stringified}`);
    };
    if (loading) return;
    return (
      <IngredientContainer className="Ingredient">
        <div ref={this.trigger}>
          <Popup
            trigger={
              <QuantityContainer id="QuantittyContainer">{`${quantity} ${us.unitShort}`}</QuantityContainer>
            }
            position={["bottom left"]}
            closeOnDocumentClick
          >
            <IngredientOptions
              quantity={quantity}
              setQuantity={setQuantity}
              unit={us.unitShort}
            />
          </Popup>
        </div>

        <Popup
          trigger={<NameContainer>{ingredient.name}</NameContainer>}
          position={["bottom center"]}
          closeOnDocumentClick
          on="focus"
        >
          <IngredientOptions
            quantity={quantity}
            setQuantity={setQuantity}
            unit={us.unitShort}
          />
        </Popup>
      </IngredientContainer>
    );
  }
}
export default withRouter(Ingredient);
