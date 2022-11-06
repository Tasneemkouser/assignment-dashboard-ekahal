import React from "react";
import { styled } from "baseui";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  Tooltip
} from "recharts";
import { useData } from "../../providers/SeasonalTemperatureProvider";

export default function YearWiseChart() {
  const { yearWiseInfo = [], reasonalFields = [] } = useData();
  console.log(yearWiseInfo);
  return (
    <ChartContaier>
      <ResponsiveContainer>
        <LineChart
          data={yearWiseInfo}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 10
          }}
        >
          <Line type="monotone" dataKey="temp" />
          {reasonalFields.map((field) => (
            <Line type="monotone" dataKey={field.id} key={field.id} />
          ))}
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            domain={[
              (dataMin) => parseInt(Math.abs(dataMin) - 5, 10),
              (dataMax) => parseInt(Math.abs(dataMax) + 5, 10)
            ]}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
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
