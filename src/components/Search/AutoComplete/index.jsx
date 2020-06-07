import React, { Component } from "react";
import { MDBInput, MDBIcon } from "mdbreact";
import { debounce } from "lodash";
import api from "utils/api";
import {
  SearchBar,
  SearchBarForm,
  AutoCompleteItem,
  AutoCompleteDisplay,
} from "./styles";
import { connect } from "react-redux";
import { addToFridgeStock } from "../../../redux/user/user.actions";
import Collapse from "react-collapse";

class AutoComplete extends Component {
  state = {
    autoComplete: [],
    searchField: "",
  };

  handlesubmit = (e) => {
    e.preventDefault();

    this.props.addToFridgeStock(this.state.searchField, this.props.ingredients);
    this.setState({
      autoComplete: [],
      searchField: "",
      isSearching: false,
    });
  };
  handleAutocompleteSelect = (x) => {
    this.props.addToFridgeStock(x);

    this.setState({
      searchField: "",
      autoComplete: [],
      isSearching: false,
    });
  };
  clearAutocomplete = () =>
    this.setState({ autoComplete: [], searchField: "" });

  handleChange = (e) => {
    this.setState({ searchField: e.target.value, autoComplete: [] });
    this.fetchAutoComplete();
    !this.state.searchField.length && this.setState({ autoComplete: [] });
  };
  fetchAutoComplete = debounce(async () => {
    this.setState({ isSearching: true });
    const data = await api("food/ingredients/autocomplete", {
      query: this.state.searchField,
      number: 5,
    });
    this.setState({ autoComplete: data, isSearching: false });
  }, 700);

  render() {
    return (
      <SearchBarForm onSubmit={this.handlesubmit} className="searchForm">
        <SearchBar className="searchBar">
          <MDBInput
            value={this.state.searchField}
            onChange={this.handleChange}
            label="Enter ingredients here"
          />
          {this.state.isSearching ? (
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : !!this.state.autoComplete.length ? (
            <div style={{ cursor: "pointer", padding: "5px" }}>
              <MDBIcon icon="times" onClick={this.clearAutocomplete} />
            </div>
          ) : (
            <MDBIcon icon="search" />
          )}
        </SearchBar>

        <AutoCompleteDisplay length={this.state.autoComplete.length}>
          {this.state.autoComplete &&
            this.state.autoComplete.map((item, index) => (
              <AutoCompleteItem
                className="autocomplete-item"
                onClick={() => this.handleAutocompleteSelect(item.name)}
                key={index}
                exists={!!item}
              >
                {item.name}
              </AutoCompleteItem>
            ))}
        </AutoCompleteDisplay>
      </SearchBarForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToFridgeStock: (item) => dispatch(addToFridgeStock(item)),
});

export default connect(null, mapDispatchToProps)(AutoComplete);
