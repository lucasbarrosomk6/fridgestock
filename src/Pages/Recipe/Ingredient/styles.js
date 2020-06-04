import styled from "styled-components";

export const IngredientContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin: 0;
  transition: all 0.5s;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 72px);
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    left: 36px;
  }
  &:hover {
    background-color: lightgrey;
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
  border-right: solid #aaa 2px;
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
export const Circle = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  justify-content: center;
  margin: 0 5px;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${(props) => (!props.missing ? "#ade9e8" : "#FA8BA2")};
  cursor: pointer;
`;
