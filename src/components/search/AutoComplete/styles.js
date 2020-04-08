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
  align-items: column;
  justify-content: flex-start;
  z-index: 2;
  margin-top: 5px;
  text-align: right;
  min-width: 180px;

  @media (max-width: 360px) {
    width: 100%;
  }
`;
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
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
  z-index: 100;
  background-position: 0 0;
  cursor: pointer;
  @media ${device.desktop} {
    font-size: 150%;
    height: ${(props) => (!props.fetchedItems ? "0px" : "15vh")};
  }
`;

export const AutoCompleteItem = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 174px;
  border-bottom: 1px #4285f4 solid;
  cursor: pointer;
  z-index: 5;
  font-size: 1rem;
  font-weight: 400;
  color: #495057;
  transition: all 0.2s;
  background-color: white;
  &:hover {
    background-color: lightgrey;
  }
`;
