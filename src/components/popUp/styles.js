import styled from "styled-components";

export const PopUpContainer = styled.div`
  position: relative;
  z-index: 8;
  display: flex;
  align-items: center;
  width: 90vw;
  max-width: 500px;
  height: 30%;
  max-height: 300px;
  background-color: grey;
`;

export const Title = styled.h1`
  border-bottom: 1px solid #ccc;
`;

export const OptionContainer = styled.div`
  position: relative;
  z-index: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 80%;
  text-align: center;
  padding: 0 5%;
`;
export const InputContainer = styled.h1`
  display: flex;
`;
