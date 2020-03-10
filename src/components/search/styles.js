import styled from "styled-components";

const size = {
  mobile: "360px",
  desktop: "600px"
};
export const device = {
  mobile: `(min-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`
};

export const SearchBarForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 20%;
  z-index: 2;
  margin: 2vh 2vh;

  align-items: center;

  @media ${device.desktop} {
    width: 100%;
    align-items: center;
  }
`;
export const SearchBar = styled.input`
  display: flex;
  height: 10%;
  width: 90%;
  align-items: center;
  text-align: center;
  font-size: 150%;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  border-radius: 1vh;
  box-shadow: 1px 1px 4px black;

  @media ${device.desktop} {
    align-items: center;
    width: 90%;
    font-size: 100%;
  }
  &:focus {
    outline: none;
  }
`;
export const AutoComplete = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: ${props => (!props.fetchedItems ? "0px" : "fit-content")};
  transition: all 0.5s;
  font-size: 120%;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  border-radius: 1vh;
  box-shadow: 1px 1px 4px black;
  overflow: hidden;
  @media ${device.desktop} {
    font-size: 150%;
    height: ${props => (!props.fetchedItems ? "0px" : "15vh")};
  }
`;

export const AutoCompleteItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  padding: 3px;
  font-size: 5vw;
  cursor: pointer;
  @media ${device.desktop} {
    height: 3vh;
    font-size: 1.7vw;
  }
  &:hover {
    background-color: lightgrey;
  }
`;

export const Ingredients = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: ${props => (props.ingredientsExist ? "fit-content" : "0")};
  width: 90%;
  font-size: 5vw;
  cursor: pointer;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  border-radius: 1vh;
  box-shadow: 1px 1px 4px black;
  overflow: hidden;
  margin-top: 5%;
  @media ${device.desktop} {
    font-size: 1.7vw;
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
