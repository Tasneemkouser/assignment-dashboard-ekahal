import { styled } from "baseui";
import { HeadingSmall } from "baseui/typography";
import React from "react";

export default function ChartView({ title, children }) {
  return (
    <ChartViewUi>
      <HeadingSmall>{title}</HeadingSmall>
      {children}
    </ChartViewUi>
  );
}

const ChartViewUi = styled("div", ({ $theme }) => ({
  flex: 1,
  height: "100%"
}));
