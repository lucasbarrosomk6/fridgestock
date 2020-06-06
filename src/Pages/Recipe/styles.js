import styled from "styled-components";

export const RecipePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  max-width: 1300px;
  z-index: 0;
  overflow: hidden;
  margin-top: 10px;
  @media (min-width: 768px) {
    margin-top: 60px;
  }
  @media (max-width: 768px) {
    align-items: center;
  }
`;
export const Overview = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BasicInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 15px;
  min-width: 324px;
  background: white;

  @media (min-width: 768px) {
    justify-content: flex-start;
    flex: 1;
    max-height: 370px;
    overflow-y: auto;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 350px;
    padding: 20px 15px 0;
    border-radius: 20px 20px 0 0;
  }
`;

export const TitleContainer = styled.div`
  position: relative;
`;
export const RecipeStatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Title = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Summary = styled.div`
  width: 100%;

  overflow-y: auto;
  transition: all 0.5s;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  min-width: 324px;
  max-width: 556px;
  transition: all 0.5s;
  background-image: url(${(props) => props.image});
  backdrop-filter: blur(2px) brightness(120%);
  background-size: cover;
  @media (min-width: 768px) {
    position: relative;
  }
  @media (max-width: 768px) {
    position: fixed;
    height: 370px;
  }
`;
export const HowToContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  width: 100%;
  margin: 10px 0;
  justify-content: space-between;
  position: relative;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 0;
    align-items: center;
  }
`;
export const RecipeStats = styled.p`
  margin: 5px;
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

  @media (min-width: 768px) {
    display: none;
  }
`;
