import React, { useState } from "react";
import {
  ImageDisplayContainer,
  ImageContainer,
  ImageBackground,
  HoverText
} from "./styles";

const TagBanner = ({ image }) => {
  const [clicked, toggleClicked] = useState(false);
  return (
    <ImageDisplayContainer
      clicked={clicked}
      background={image}
      onClick={() => toggleClicked(!clicked)}
    >
      <ImageBackground src={image} />
      <ImageContainer src={image} />
      <HoverText>
        {!clicked ? "Click to see full image" : "Click to colapse image"}
      </HoverText>
    </ImageDisplayContainer>
  );
};
export default TagBanner;
