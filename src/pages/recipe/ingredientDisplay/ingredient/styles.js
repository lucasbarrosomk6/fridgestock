import styled from "styled-components";

export const IngredientContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 100%; */

  padding: 0 10px;
  margin: 5px 0;
  border-radius: 20px;
  transition: all 0.5s;
  background-color: ${(props) => (!props.missing ? "#ade9e8" : "#FA8BA2")};
  &:hover {
    background-color: ${(props) => (!props.missing ? "#5ad3d1" : "#FA8BA2")};
  }
`;
export const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15%;
  min-width: 70px;
  height: 100%;
  border-right: solid black 1px;
  padding: 5px 0px;
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
