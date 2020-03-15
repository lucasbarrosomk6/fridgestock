import styled from "styled-components";

export const PopUpContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 100vh;
  z-index: 8;
  margin: 0 auto;
`;
export const Display = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  max-width: 500px;
  height: 50%;
  max-height: 700px;
  z-index: 12;
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  color: black;
`;
