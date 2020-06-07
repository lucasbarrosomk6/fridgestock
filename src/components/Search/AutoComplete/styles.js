import styled from "styled-components";

const size = {
  mobile: "360px",
  desktop: "600px",
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;
export const AutoCompleteDisplay = styled.div`
  position: absolute;
  top: 32px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 21px);
  height: ${(props) => `${props.length * 40}px`};

  font-size: 120%;
  background-color: rgb(255, 255, 255, 0.5);
  border: none;
  z-index: 100;
  background-position: 0 0;
  cursor: pointer;
  @media (min-width: 768px) {
    font-size: 150%;
    height: ${(props) => (!props.fetchedItems ? "0px" : "15vh")};
  }
  transition: all 0.5s;
`;

export const AutoCompleteItem = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;

  border-bottom: 1px #4285f4 solid;
  cursor: pointer;
  z-index: 5;
  font-size: 1rem;
  font-weight: 400;
  color: #495057;

  background-color: white;
  &:hover {
    background-color: lightgrey;
  }
`;
