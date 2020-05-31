import styled from "styled-components";
import { deviceSizes as device } from "../../diviceSizes";

//this app is designed for mobile from the ground up,
//all media quieries will be for any size greater than mobile

export const RecipePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 90%;
  z-index: 0;
  overflow: hidden;
  @media ${device.desktop} {
    justify-content: space-between;
  }
`;
export const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0 20px;

  /*  */
`;
export const BasicInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
  min-width: 324px;
  z-index: 3;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  z-index: 3;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
export const TagBanner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  z-index: 3;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export const Summary = styled.div`
  width: 100%;
  ${(props) => !props.expand && "height:100px"};
  overflow: hidden;
  transition: all 0.5s;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Circle = styled.div`
  position: absolute;
  display: block;
  right: 70%;
  width: 750px;
  height: 350px;
  border-radius: 50%;
  z-index: 2;
  background-color: #5ad3d1;
  z-index: -1;
  width: 50%;
  @media (max-width: 768px) {
    display: none;
  }
`;
export const ImageContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  right: 0;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  min-width: 324px;
  max-width: 556px;
  transition: all 0.5s;
  background-image: url(${(props) => props.image});
  backdrop-filter: blur(2px) brightness(120%);
  background-size: cover;
  @media (max-width: 768px) {
    position: relative;
    height: ${(props) => (props.clicked ? "370px" : "100px")};
    max-width: 674px;
  }
`;
export const DisplayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  margin: 10px 0;
  justify-content: space-between;
  position: relative;
  margin-top: 80px;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

export const IngredientDisplay = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #ade9e8;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: fit-content;
`;
