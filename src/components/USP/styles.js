import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 100%;
  text-align: center;
`;
export const USPItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 280px;
`;
export const Image = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px;
`;
export const H1 = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
`;
