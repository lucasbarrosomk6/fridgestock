import React from "react";
import { TagBannerContainer, InfoContainer, DataDisplay } from "./styles";

const TagBanner = ({ text, data, warning }) => {
  const color = warning ? "red" : "black";
  if (!data.length) return null;
  return (
    <TagBannerContainer className="TagBannerContainer" color={color}>
      <InfoContainer>{text}</InfoContainer>
      <InfoContainer className="info-container">
        {data.map(item => (
          <DataDisplay key={item.name ? item.name : item}>
            {item.name ? item.name : item}
          </DataDisplay>
        ))}
      </InfoContainer>
    </TagBannerContainer>
  );
};
export default TagBanner;
