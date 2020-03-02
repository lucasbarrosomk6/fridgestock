import React from "react";

import {
  FlexShowcaseContainer,
  FlexShowcaseTitle,
  FlexShowcaseContent
} from "./styles";

export const FlexShowcase = ({ title, children, column }) => (
  <FlexShowcaseContainer>
    <FlexShowcaseTitle>
      <h1>{title}</h1>
    </FlexShowcaseTitle>
    <FlexShowcaseContent column={column}>{children}</FlexShowcaseContent>
  </FlexShowcaseContainer>
);
