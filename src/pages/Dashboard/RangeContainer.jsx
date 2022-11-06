import React, { useMemo } from "react";
import { styled } from "baseui";
import YearWiseDetails from "./YearWiseDetails";
import YearWiseChart from "./YearWiseChart";
import ChartView from "../../components/ChartView";
import AnnualTemperatureChart from "./AnnualTemperatureChart";
import { useData } from "../../providers/SeasonalTemperatureProvider";

export default function RangeContainer() {
  const { currentYearRange = [] } = useData();
  const yearInfo = useMemo(() => {
    return currentYearRange.join(" to ");
  }, [currentYearRange]);
  return (
    <Layout className="ui-years">
      <TopSection className="ui-top-section">
        <ChartView title={`${yearInfo} Year Wise Info`}>
          <YearWiseChart />
        </ChartView>

        <ChartView title={`${yearInfo} Annual Tempareture Info`}>
          <AnnualTemperatureChart />
        </ChartView>
      </TopSection>

      <YearWiseDetails />
    </Layout>
  );
}

const Layout = styled("div", ({ $theme }) => ({
  flex: 1,
  padding: "16px",
  overflowY: "auto"
}));

const TopSection = styled("div", ({ $theme }) => ({
  display: "flex",
  margin: "0 0 16px 0",
  gap: "16px"
}));
