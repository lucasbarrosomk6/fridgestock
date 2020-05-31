import styled from "styled-components";

export const IngredientContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

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
  justify-content: flex-end;
  align-items: center;
  width: ${(props) => {
    if (props.width.quantity.idealWidth < props.width.quantity.maxWidth) {
      return `${props.width.quantity.idealWidth}px`;
    } else if (
      props.width.name.idealWidth < props.width.name.maxWidth &&
      props.width.quantity.idealWidth > props.width.quantity.maxWidth
    ) {
      return `${
        props.width.quantity.maxWidth +
        (props.width.name.maxWidth - props.width.name.idealWidth)
      }`;
    } else {
      return `${props.width.quantity.maxWidth}px`;
    }
  }};
  height: 100%;
  border-right: solid black 1px;
  padding: 0 10px 0 0;
  text-align: right;
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
  min-width: ${(props) => {
    if (props.width.name.idealWidth < props.width.name.maxWidth) {
      return `${props.width.name.idealWidth}px`;
    } else {
      return `${props.width.name.maxWidth}px`;
    }
  }};
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
