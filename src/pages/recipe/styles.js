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
  min-width: 320px;
  z-index: 3;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
`;
export const TagBanner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 3;
`;
export const Summary = styled.div`
  width: 100%;
  ${(props) => !props.expand && "height:100px"};
  overflow: hidden;
  transition: all 0.5s;
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
`;
export const Display = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  background-color: #ade9e8;
  padding: 10px;
  border-radius: 10px;
`;
