import React from "react";
import { styled } from "baseui";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useData } from "../../providers/SeasonalTemperatureProvider";

export default function AnnualTemperatureChart() {
  const { yearWiseInfo = [] } = useData();
  return (
    <ChartContaier>
      <ResponsiveContainer>
        <ComposedChart
          data={yearWiseInfo}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 10
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis
            type="number"
            tickCount={8}
            domain={[
              (dataMin) => parseInt(Math.abs(dataMin) - 2, 10),
              (dataMax) => parseInt(Math.abs(dataMax) + 2, 10)
            ]}
          />
          <Tooltip />
          <Bar dataKey="temp" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="temp" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContaier>
  );
}

const ChartContaier = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "220px",
  background: "rgba(255,255,255,.75)",
  backdropFilter: "blur(2px)",
  marginTop: "8px"
}));
