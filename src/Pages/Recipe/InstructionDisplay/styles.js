import styled from "styled-components";

//instruction styles start here
export const InstructionDisplayStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 100;
  margin: 10px 0 10px 0;
  background-color: #ade9e8;
  padding: 10px;
  height: fit-content;
  border-radius: 10px;
  min-width: 300px;
  @media (min-width: 700px) {
    margin: 0 0 0 10px;
  }
`;
export const InstructionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.5s;
  &:hover {
    background-color: #5ad3d1;
  }
`;
export const StepNuber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 100%;
  padding: 0 10px;
`;
export const StepContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: solid black 1px;
  justify-content: space-between;
  padding-left: 10px;
`;
export const IngredientContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

//instruction styles end here
