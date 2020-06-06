import styled from "styled-components";

export const NavBarContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 50px;
  padding: 5px 30px;
  z-index: 1000;
  @media (min-width: 768px) {
    background-color: #0ce5e1;
  }
  @media (max-width: 768px) {
    background: ${(props) => (props.path === "/" ? "#0ce5e1" : "rgb(0, 0, 0)")};
    background: ${(props) =>
      props.path === "/"
        ? "#0ce5e1"
        : "linear-gradient(180deg,rgba(0, 0, 0, 0.6797093837535014) 0%,rgba(0, 0, 0, 0.16150210084033612) 88%)"};
    padding: 5px 15px;
  }
`;
export const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 35px;
  height: 35px;
  color: white;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;
export const SignInSignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;

  border-radius: 2px;
  background: white;
  margin: 0 10px;
`;
