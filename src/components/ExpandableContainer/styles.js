import styled from "styled-components";

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
  margin-bottom: 32px;
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
  transition: all 0.5s;

  @media (min-width: 768px) {
    display: none;
  }
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
