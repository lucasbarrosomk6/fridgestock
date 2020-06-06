import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromFridgeStock } from "../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectUserFridgeStock } from "../redux/user/user.selector";

import { MDBIcon } from "mdbreact";
import { NavBarContainer, UserIcon, NavRight, SignInSignUp } from "./styles";
import AutoComplete from "../components/Search/AutoComplete";

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { pathname } = this.props.location;
    console.log(pathname);
    return (
      <NavBarContainer path={pathname}>
        <Link to="/" style={{ color: "white" }}>
          {pathname === "/" ? (
            <h1>FridgeStock</h1>
          ) : (
            <MDBIcon icon="chevron-left" size="lg" />
          )}
        </Link>
        <NavRight>
          <SignInSignUp></SignInSignUp>
          <UserIcon onClick={() => this.toggleCollapse()}>
            <MDBIcon far={this.state.isOpen} icon="user" size="lg" />
          </UserIcon>
        </NavRight>
      </NavBarContainer>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  removeFromFridgeStock: (item) => dispatch(removeFromFridgeStock(item)),
});

const mapStateToProps = createStructuredSelector({
  fridgeStock: selectUserFridgeStock,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
// return ( return statement pre edit.
//   <Navbar bg="light" id="nav" expand="lg" sticky="top">
//     <Link to="/">
//       <Navbar.Brand>
//         <strong>FridgeStock</strong>
//       </Navbar.Brand>
//     </Link>
//     <FridgestockButton
//       clicked={this.state.isOpen}
//       onClick={this.toggleCollapse}
//     >
//       <MDBIcon
//         icon="utensils"
//         size="2x"
//         className={`${this.state.isOpen ? "cyan-text" : "white-text"}`}
//       />
//     </FridgestockButton>
//     <FridgeStockDisplay clicked={this.state.isOpen}>
//       <AutoComplete className="autocomplete" />
//       {this.props.fridgeStock &&
//         !!this.props.fridgeStock.length &&
//         this.props.fridgeStock.map((Ingredient) => (
//           <IngredientDisplay key={Ingredient}>
//             {Ingredient}
//             <DeleteContainer>
//               <MDBIcon
//                 far
//                 icon="times-circle"
//                 onClick={() => this.props.removeFromFridgeStock(Ingredient)}
//               />
//             </DeleteContainer>
//           </IngredientDisplay>
//         ))}
//     </FridgeStockDisplay>
//   </Navbar>
// );
