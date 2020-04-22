import styled from "styled-components";
import { MDBInput } from "mdbreact";

const size = {
  mobile: "360px",
  desktop: "600px",
};
export const device = {
  mobile: `(min-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const SearchBar = styled.div`
  display: flex;
  height: 10%;
  min-width: 180px;
  align-items: center;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  border-radius: 1vh;
  box-shadow: 1px 1px 4px black;
  margin: 5px 0;
  @media ${device.desktop} {
    align-items: center;
    width: 90%;
    font-size: 100%;
  }
  &:focus {
    outline: none;
  }
`;

export const Ingredients = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  flex-grow: 1;
  min-width: 180px;
  height: fit-content;
  @media (max-width: 420px) {
    justify-content: center;
  }
`;
export const RecipeSearchButton = styled.div`
  position: relative;
  width: 150%;
  background-color: lightgray;
  text-align: center;
  color: black;
  border-top: black 1px solid;
  transition: background-color 0.5s;
  &:hover {
    background-color: gray;
    color: white;
    font-weight: bold;
    border: none;
  }
`;
