import styled, { css } from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    max-width: 600px;
  }
  @media (max-width: 768px) {
    width: 95%;
  }
`;
export const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  height: 60px;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    @media (max-width: 768px) {
      width: calc(100% - 32px);
      left: 16px;
    }

    height: 1px;
    background: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    @media (max-width: 768px) {
      width: calc(100% - 32px);
      left: 16px;
    }
    height: 1px;
    background: rgba(0, 0, 0, 0.3);
    bottom: 0;
    left: 0;
  }
`;
export const DataContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-height: ${(props) => (props.clicked ? "9000px" : "0")};
  overflow: hidden;

  transition: all 0.5s;
`;
export const CloseContainer = styled.div`
  position: relative;
  top: 2.5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  transform: rotate(${(props) => (!props.clicked ? "180deg" : "0deg")});
  transition: all 0.1s;
`;

export const EndCap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    width: calc(100% - 32px);
  }
  padding: 0 15px;
  height: 10px;
  border-top: solid 1px rgba(0, 0, 0, 0.3);
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
`;
export const IngredientProgress = styled.div`
  position: relative;

  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 5px;
  margin: 0 5px;

  background-color: rgb(255, 250, 250, 0.5);
`;
