import React from "react";
import { Tabs, Tab } from "baseui/tabs";
import { useData } from "../../providers/SeasonalTemperatureProvider";
import { styled } from "baseui";
import MonthWiseDetails from "./MonthWiseDetails";
import ChartView from "../../components/ChartView";
import MonthlyWiseChart from "./MonthlyWiseChart";

export default function YearWiseDetails() {
  const { yearRange = [] } = useData();
  const [activeKey, setActiveKey] = React.useState("0");
  if (yearRange.length <= 0) {
    return null;
  }
  return (
    <Tabs
      onChange={({ activeKey }) => {
        setActiveKey(activeKey);
      }}
      activeKey={activeKey}
    >
      {yearRange.map((year, idx) => (
        <Tab title={year} key={idx}>
          <YearDetailContainer>
            <MonthWiseDetails year={year} />
            <ChartView title={`Monthly Wise Info for ${year}`}>
              <MonthlyWiseChart year={year} />
            </ChartView>
          </YearDetailContainer>
        </Tab>
      ))}
    </Tabs>
  );
}

const YearDetailContainer = styled("div", ({ $theme }) => ({
  display: "flex"
}));
