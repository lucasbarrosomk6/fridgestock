import styled from "styled-components";
import { deviceSizes as device } from "../../diviceSizes";

//this app is designed for mobile from the ground up,
//all media quieries will be for any size greater than mobile

export const FridgestockContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 90vw;
  margin: 2% 1%;
  background-color: lightgrey;
  flex-direction: column;
  @media ${device.desktop} {
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    min-width: 540px;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 1vh 0;
  border-bottom: 1px solid black;
  height: fit-content;
  text-align: center;
  @media ${device.desktop} {
    border-right: 1px solid black;
    border-bottom: none;
    width: 33.5vw;
    max-width: 266px;
    min-width: 190px;
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
  flex-direction: column;
  align-items: center;
  align-items: space-around;
  height: fit-content;
  width: 90vw;
  margin: 1vh 0;
  @media ${device.desktop} {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    flex: 1;
    height: fit-content;
    min-width: 350px;
  }
`;

export const MakeItNowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${props =>
    props.recipesFetched ? `${props.recipesFetched * 14}vh` : "0px"};
  width: 90%;
  overflow: hidden;
  @media ${device.desktop} {
    align-items: center;
    height: ${props =>
      props.recipesFetched ? `${props.recipesFetched * 13}vh` : "0px"};
    width: 25vw;
    min-width: 350px;
  }
  transition: all 0.5s;
`;
export const SoCloseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${props =>
    props.recipesFetched ? `${props.soCloseFetched * 14}vh` : "0px"};
  width: 90%;
  overflow: hidden;
  @media ${device.desktop} {
    align-items: center;
    height: ${props =>
      props.soCloseFetched ? `${props.soCloseFetched * 13}vh` : "0px"};
    width: 25vw;
    min-width: 350px;
  }
  transition: all 0.5s;
`;
export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150%;
  background-color: lightgray;
  border-bottom: 1px solid black;
`;
