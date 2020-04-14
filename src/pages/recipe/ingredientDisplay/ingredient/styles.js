import styled from "styled-components";
import Popup from "reactjs-popup";

export const IngredientContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 30px;
  max-height: 50px;
  height: 3vh;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.5s;
  &:hover {
    background-color: #5ad3d1;
  }
`;
export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15%;
  min-width: 100px;
  height: 100%;
  border-right: solid black 1px;
  padding: 0 10px;
  cursor: pointer;
`;
export const NameContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: fit-content;
  justify-content: space-between;
  padding-left: 10px;
  height: 100%;
`;
export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  justify-content: center;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;
`;
