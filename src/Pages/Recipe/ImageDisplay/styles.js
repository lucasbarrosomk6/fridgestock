import styled from "styled-components";

export const HoverText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  bottom: 12px;
  z-index: 6;
  color: transparent;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s;
`;
export const ImageDisplayContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => (props.clicked ? "370px" : "20vh")};
  overflow: hidden;
  transition: height 0.5s;
  &:hover {
    ${HoverText} {
      color: white;
      background-color: grey;
    }
  }
`;
export const ImageContainer = styled.img`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  border: 1px black solid;
`;
export const ImageBackground = styled.img`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
  filter: blur(5px);
`;
