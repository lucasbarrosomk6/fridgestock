import styled from "styled-components";

const size = {
  mobile: "360px",
  desktop: "600px",
};
export const device = {
  mobile: `(min-width: ${size.mobile})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const SearchBarForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 90%;
  height: 20%;
  z-index: 2;
  margin: 2vh 2vh;
  text-align: right;
  align-items: center;

  @media ${device.desktop} {
    width: 80%;
    align-items: center;
  }
`;
export const SearchBar = styled.div`
  display: flex;
`;
export const AutoCompleteDisplay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-height: ${(props) => (!props.fetchedItems ? "0px" : "fit-content")};
  transition: all 0.5s;
  font-size: 120%;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  border-radius: 1vh;
  box-shadow: 1px 1px 4px black;
  overflow: hidden;
  @media ${device.desktop} {
    font-size: 150%;
    height: ${(props) => (!props.fetchedItems ? "0px" : "15vh")};
  }
`;

export const AutoCompleteItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  padding: 3px;
  font-size: 5vw;
  cursor: pointer;
  @media ${device.desktop} {
    height: 3vh;
    font-size: 1.7vw;
  }
  &:hover {
    background-color: lightgrey;
  }
`;
