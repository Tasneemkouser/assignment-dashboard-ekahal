import React from "react";
import { styled } from "baseui";
import Sidebar from "./Sidebar";
import { useData } from "../../providers/SeasonalTemperatureProvider";
import RangeContainer from "./RangeContainer";

export default function Dashboard() {
  const { yearRange = [] } = useData();
  console.log(":: yearRange ::", yearRange);
  return (
    <DashboardLayout>
      <Sidebar />
      <RangeContainer />
    </DashboardLayout>
  );
}

const DashboardLayout = styled("div", ({ $theme }) => ({
  height: "100%",
  display: "flex",
  width: "100%",
  overflow: "hidden"
}));
