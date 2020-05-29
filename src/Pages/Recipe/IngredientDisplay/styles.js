import styled from "styled-components";

export const IngredientDisplayContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`;
export const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding: 2%;
  margin: 2%;
  border: 1px solid black;
  width: 60%;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    color: white;
    border: white;
    background-color: black;
  }
`;
export const RadioContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
`;
export const UnitToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 90%;
  margin: 5%;
  border: 1px solid black;
  background-color: ${(props) => (props.selected ? "black" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "black")};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: white;
    border: white;
    background-color: black;
  }
`;
