import styled from "styled-components";
import { deviceSizes as device } from "../../diviceSizes";

//this app is designed for mobile from the ground up,
//all media quieries will be for any size greater than mobile

export const RecipePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  background-color: lightgrey;
  @media ${device.desktop} {
    justify-content: space-between;
  }
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: lightgrey;
  text-align: center;
  @media ${device.desktop} {
    flex-direction: row;
    justify-content: center;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => (props.clicked ? "59.4vw" : "20vh")};
  /* height changes to show the whole photo assuming a standard pic size of  556px x 370 */
  width: 100%;
  overflow: hidden;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: all 0.5s;
  cursor: pointer;
  border-bottom: 1px solid black;
`;

export const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const HoverMessage = styled.h1`
  color: ${props => (props.hover ? "black" : "transparent")};
  transition: color 0.5s;
`;
export const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: black 1px solid;
`;
export const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 30px;
  flex-wrap: wrap;
  padding: 2px;
  border: 1px black solid;
  border-radius: 5px;
  margin: 1vw;
`;
export const WarningDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: red 1px solid;
  border-bottom: red 1px solid;
  height: fit-content;
  overflow: hidden;
`;
export const WarningIngredients = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  flex-wrap: wrap;
`;
