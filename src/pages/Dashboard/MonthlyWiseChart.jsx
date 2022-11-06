import React, { useEffect, useMemo, useState } from "react";
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

export default function MonthlyWiseChart({ year }) {
  const { fields = [], records = [] } = useData();
  const [data = [], setData] = useState([]);
  const record = useMemo(() => {
    return records.find((record) => +record._year === +year);
  }, [records, year]);

  useEffect(() => {
    if (record) {
      setData(
        fields.map(({ id, name }) => ({
          name,
          value: record[id]
        }))
      );
    }
  }, [record, fields]);

  if (!data.length) return null;
  return (
    <ChartContaier>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
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
          <Bar dataKey="value" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContaier>
  );
}

const ChartContaier = styled("div", ({ $theme }) => ({
  width: "100%",
  height: "392px",
  background: "rgba(255,255,255,.75)",
  backdropFilter: "blur(2px)",
  marginTop: "8px"
}));
