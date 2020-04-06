import styled from "styled-components";

export const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90vw;
  border-bottom: 1px solid black;
  position: relative;
`;
export const Title = styled.div`
  display: flex;

  flex-direction: column;
  width: 100%;
  background-color: lightgrey;
  color: black;
  h1 {
    font-size: 200%;
  }
`;
export const NavigationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;
export const NavButton = styled.div`
  display: flex;
  justify-content: center;
`;
