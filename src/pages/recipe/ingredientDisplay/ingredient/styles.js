import styled from "styled-components";

export const IngredientContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 30px;
  max-height: 50px;
  height: 3vh;
  margin: 5px 0;
  cursor: pointer;
  &:hover {
    color: white;
    border: white;
    background-color: grey;
  }
  transition: all 0.5s;
`;
export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 100px;
  height: 90%;
  border-right: solid black 1px;
  padding: 0 10px;
`;
export const NameContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: fit-content;
  margin-left: 10px;
`;
