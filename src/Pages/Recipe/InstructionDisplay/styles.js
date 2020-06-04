import styled from "styled-components";

//instruction styles start here
export const InstructionDisplayStyles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 100;
  margin: 0 0 10px 0;
  padding: 10px;
  height: fit-content;
  border-radius: 10px;
  min-width: 300px;
  @media (min-width: 768px) {
    margin: 0 0 0 10px;
  }
`;
export const InstructionContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  padding: 5px 10px;
  border-radius: 2px;
  transition: all 0.5s;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 16px);
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    left: 8px;
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
  color: #6c757d;
`;
export const StepContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  justify-content: space-between;
  padding-left: 10px;
`;
export const IngredientContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const IngredientList = styled.p`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${(props) => (!props.missing ? "#5AD3D1" : "#FA8BA2")};
  margin: 0 5px;
`;
export const Divider = styled.div`
  display: block;
  width: 95%;
`;
//instruction styles end here
