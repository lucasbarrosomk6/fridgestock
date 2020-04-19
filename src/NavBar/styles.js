import styled from "styled-components";

export const FridgestockButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${(props) => (props.clicked ? "white" : "transparent")};
  border-radius: 3px;
  transition: all 0.3s;
`;
export const FridgeStockDisplay = styled.div`
  position: absolute;
  right: 2%;
  top: ${(props) => (props.clicked ? "64px" : "40px")};
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.clicked ? "250px" : "0px")};
  height: ${(props) => (props.clicked ? "300px" : "0px")};
  padding: ${(props) => (props.clicked ? "10px" : "0px")};
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 2px 5px black;
  transition: all 0.3s;
  overflow-y: auto;
`;
export const IngredientDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  background-color: #5ad3d1;
  border-radius: 20px;
  padding: 0 10px;
  margin: 5px 0;
  :hover {
    background-color: #ade9e8;
  }
  transition: all.3s;
`;
export const NavButton = styled.div`
  display: flex;
  justify-content: center;
`;
export const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  justify-content: center;
  height: 100%;

  cursor: pointer;
`;
