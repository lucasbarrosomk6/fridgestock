import React from "react";
import { TagBannerContainer, InfoContainer, DataDisplay } from "./styles";
import Chip from "@material-ui/core/Chip";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5ad3d1",
      main: "#5ad3d1",
      dark: "#FA8BA2",
    },
  },
});

const TagBanner = ({ text, data, warning }) => {
  const color = warning ? "red" : "black";
  if (!data.length) return null;
  return (
    <TagBannerContainer className="TagBannerContainer" color={color}>
      <InfoContainer>{text}</InfoContainer>
      <InfoContainer className="info-container">
        {data.map((item) => (
          <div style={{ margin: "5px 3px" }} key={item.name ? item.name : item}>
            <ThemeProvider theme={theme}>
              <Chip
                label={item.name ? item.name : item}
                className={`ingredientChip ${item.name ? item.name : item}`}
                color="primary"
              />
            </ThemeProvider>
          </div>
        ))}
      </InfoContainer>
    </TagBannerContainer>
  );
};
export default TagBanner;
