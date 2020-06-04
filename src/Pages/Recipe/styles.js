import styled from "styled-components";

export const RecipePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 100%;
  max-width: 1000px;
  z-index: 0;
  overflow: hidden;
  margin-top: 10px;
  @media (max-width: 768px) {
    align-items: center;
  }
`;
export const TitleContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  margin: 0px 0 0px;
  @media (min-width: 768px) {
    max-height: 370px;
    flex-direction: row;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  /*  */
`;
export const BasicInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 570px);
  max-height: 370px;
  padding: 0 15px;
  min-width: 324px;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  z-index: 3;
  @media (max-width: 768px) {
  }
`;
export const TagBanner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  z-index: 3;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export const Summary = styled.div`
  width: 100%;
  flex: 1;
  overflow: auto;
  transition: all 0.5s;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const ImageContainer = styled.div`
  position: absolute;
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
    position: relative;
    height: 370px;
  }
`;
export const DisplayContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  margin: 10px 0;
  justify-content: space-between;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 0;
    align-items: center;
  }
`;
export const RecipeStats = styled.p`
  margin: 5px;
`;
