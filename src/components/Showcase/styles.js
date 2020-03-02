import styled from "styled-components";
import { Input } from "bulma";

export const FlexShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  max-height: 750px;
  width: 30vw;
  min-width: 400px;
  box-shadow: 2px 2px 3px 2px black;

  overflow: auto;
  border-radius: 1vh;
  margin: 2.5% 5%;
  flex: 1;
`;
export const FlexShowcaseTitle = styled.div`
  width: 100%;
  text-align: center;
  background-image: url("https://storage.needpix.com/rsynced_images/metal-316803_1280.jpg");

  margin-bottom: 2%;
`;
export const FlexShowcaseContent = styled.div`
  display: flex;
  justify-content: ${props => (props.column ? "flex-start" : "center")};
  align-items: ${props => (props.column ? "flex-start" : "center")};
  flex-direction: ${props => (props.column ? "column" : "row")};
  flex-wrap: wrap;
  width: 90%;
  flex: 1;
  overflow-y: auto;
  background-image: url();
`;
