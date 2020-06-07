import styled from "styled-components";
import Theme from "../../styles";

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
  font-weight: 500;
  @media (min-width: 768px) {
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
  margin: 10px;
  border: 3px solid ${Theme.lightBlue};
  border-radius: 10px;
  @media (max-width: 768px) {
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
export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 500;
  font-size: 1.3rem;
  text-align: center;
  color: ${Theme.lightBlue};
  padding: 10px;
`;
