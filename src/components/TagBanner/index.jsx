import React from "react";
import { TagBannerContainer, InfoContainer, DataDisplay } from "./styles";

const TagBanner = ({ text, data, warning }) => {
  const color = warning ? "red" : "black";
  return (
    <TagBannerContainer className="TagBannerContainer" color={color}>
      {text ? <InfoContainer>{text}</InfoContainer> : null}
      {data.length ? (
        <InfoContainer>
          {data.map(item => (
            <DataDisplay key={item.name ? item.name : item}>
              {item.name ? item.name : item}
            </DataDisplay>
          ))}
        </InfoContainer>
      ) : null}
    </TagBannerContainer>
  );
};
export default TagBanner;
