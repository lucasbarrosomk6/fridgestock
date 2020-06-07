import styled from "styled-components";
import Theme from "../../styles";

export const RecipeCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
`;

export const RecipeImage = styled.img`
  position: static;
  width: 100%;
  height: auto;
  z-index: 0;
  &:hover {
    transform: scale(1.05);
  }
  transition: all 5s;
`;
export const InfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1;
  border-radius: 10px;
  background-color: ${Theme.offWhite};
  bottom: 10px;
  &:hover {
    transform: translate(0, -5px);
  }
  transition: all 0.5s;
`;
export const Title = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 500;
  padding: 0 10px;
  min-height: 40px;
  &::after {
    content: "";
    position: absolute;
    width: calc(100% - 16px);
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    left: 8px;
  }
`;
export const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 5px;
`;

export const IngredientProgress = styled.div`
  position: relative;

  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  padding: 5px;
  margin: 0 5px;

  background-color: rgb(255, 250, 250, 0.5);
`;
export const CloseContainer = styled.div`
  position: relative;
  top: 2.5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px;
  transform: rotate(${(props) => (!props.clicked ? "180deg" : "0deg")});
  transition: all 0.5s;
  cursor: pointer;
`;
