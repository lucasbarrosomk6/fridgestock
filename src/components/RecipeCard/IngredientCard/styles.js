import styled from "styled-components";
import Theme from "../../../styles";

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 600px;
  padding: 5px 0;
  overflow: hidden;
  cursor: pointer;
  font-weight: 500;
  &::after {
    content: "";
    position: absolute;
    width: calc(50% - 16px);
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    left: 8px;
  }
  &:hover {
    left: 2px;
  }
  transform: translate(${(props) => (props.clicked ? "-300px" : "0px")});
  transition: transform 0.5s;
`;
export const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 100%;
  padding: 5px;
  overflow: hidden;
`;
export const Sub = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 100%;
  padding: 5px 10px;
  overflow: hidden;
`;
export const Circle = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  justify-content: center;
  margin: 0 10px;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${(props) =>
    !props.missing ? Theme.lightBlue : Theme.red};
  cursor: pointer;
`;
export const YesNo = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  justify-content: center;
  padding: 10px 5px;
  height: 32px;
  border-radius: 6px;
  border: 2px solid ${Theme.offWhite};
  color: ${Theme.offWhite};
  background-color: ${(props) => (props.yes ? Theme.lightBlue : Theme.red)};
  cursor: pointer;
`;
