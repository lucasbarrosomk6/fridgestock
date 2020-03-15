import styled from "styled-components";

export const IngredientContainer = styled.div`
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
export const OptionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: ${props => (props.clicked ? "10%" : "0")};
  min-width: ${props => (props.clicked ? "100px" : "0")};
  border: ${props => (props.clicked ? "1px solid black" : "2px dashed black")};
  overflow: hidden;
  transition: all 0.5s;
  font-size: 0.7rem;
  margin-right: 1%;
`;
export const OptionButtonLabel = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: fit-content;
  min-width: 100px;
`;
