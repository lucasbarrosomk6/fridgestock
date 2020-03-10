import styled from "styled-components";
import { deviceSizes as device } from "../../diviceSizes";

export const IngredientContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4vh;
  min-height: 30px;
  text-align: center;
  width: fit-content;
  min-width: 80px;
  margin: 1vh 1vh;
  padding: 0 1vw;
  font-size: 1rem;
  border: grey solid 1px;
  border-radius: 2vw;
  background-color: rgb(211, 211, 211);
  transition: all 0.5s;
  box-shadow: 1px 2px 2px black;
  @media ${device.desktop} {
    font-size: 1rem;
  }
`;
export const IngredientRemove = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.5vw;
  height: 6.5vw;
  max-width: 25px;
  min-width: 20px;
  max-height: 30px;
  min-height: 20px;
  padding: 0.4vw 0.8vw;
  margin-left: 1vw;
  border: grey solid 1px;
  border-radius: 50%;
  background-color: rgb(211, 211, 211, 0.5);
  font-size: 70%;
  box-shadow: 1px 1px 1px black;
  cursor: pointer;
  &:hover {
    background-color: darkgray;
  }
  @media ${device.desktop} {
    width: 2vw;
    min-width: 15px;
    max-width: 10%;
    height: 2vw;
    min-height: 15px;
    max-height: 90%;
  }
`;
