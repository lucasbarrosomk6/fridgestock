import styled from "styled-components";

//this app is designed for mobile from the ground up,
//all media quieries will be for any size greater than mobile

export const FridgestockContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 1000px;
  margin: 50px 0 0 0;
  flex-direction: column;
  z-index: 10;
  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  text-align: center;
  overflow: visible;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const InputTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid black;
  width: 90%;
`;

export const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const MakeItNowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  @media (min-width: 768px) {
    align-items: center;
    width: 25vw;
    min-width: 350px;
  }
  transition: all 0.5s;
`;
export const SoCloseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  @media (min-width: 768px) {
    align-items: center;
    width: 25vw;
    min-width: 350px;
  }
  transition: all 0.5s;
`;
