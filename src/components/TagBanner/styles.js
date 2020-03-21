import styled from "styled-components";

export const TagBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: fit-content;
  border-top: solid 1px ${props => props.color};
  border-bottom: solid 1px ${props => props.color};
  color: ${props => props.color};
`;
export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: fit-content;
  text-align: center;
`;
export const DataDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 30px;
  flex-wrap: wrap;
  padding: 2px;
  border: 1px ${props => props.color} solid;
  border-radius: 5px;
  margin: 1vw;
  color: ${props => props.color};
`;
