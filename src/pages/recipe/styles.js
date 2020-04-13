import styled from "styled-components";
import { deviceSizes as device } from "../../diviceSizes";

//this app is designed for mobile from the ground up,
//all media quieries will be for any size greater than mobile

export const RecipePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  background-color: lightgrey;
  z-index: 0;
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
export const HoverMessage = styled.h1`
  color: transparent;
  transition: color 0.5s;
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.clicked ? "370px" : "200px")};
  /* height changes to show the whole photo assuming a standard pic size of  556px x 370 */
  width: 556px;
  overflow: hidden;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  transition: all 0.5s;
  cursor: pointer;
  border-bottom: 1px solid black;

  &:hover {
    ${HoverMessage} {
      color: black;
    }
  }
`;

export const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: black 1px solid;
`;
