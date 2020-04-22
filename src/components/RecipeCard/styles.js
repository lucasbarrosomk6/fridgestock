import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-width: 100%;
  margin: 1vh 0;
  transition: all 0.5s;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  color: black;
  background-color: white;
  min-height: 80px;
  &:hover {
    background-color: lightgray;
  }
  cursor: pointer;
`;

export const RecipeImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  height: 100%;
  min-height: 80px;
  width: 25%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 75%;
  font-size: 0.8rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: fit-content;
  border-bottom: 1px solid black;
  width: 100%;
`;

export const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
  height: 100%;
`;
