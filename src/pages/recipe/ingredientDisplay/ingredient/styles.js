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
  margin: 5px 0;

  transition: all 0.5s;
`;
export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 100px;
  height: 100%;
  border-right: solid black 1px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: grey;
  }
`;
export const NameContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  height: fit-content;
  padding-left: 10px;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: grey;
  }
`;

export const StyledPopup = styled(Popup)`
  &-content {
    position: relative;
    z-index: 10;
  }
`;
