import React, { useMemo } from "react";
import { styled } from "styletron-react";
import { ListItem, ListItemLabel } from "baseui/list";
import { useData } from "../../providers/SeasonalTemperatureProvider";

export default function MonthWiseDetails({ year }) {
  const { fields = [], records = [] } = useData();
  const record = useMemo(() => {
    return records.find((record) => +record._year === +year) || {};
  }, [records, year]);
  return (
    <MonthWiseDetailsLayout>
      {fields.map((field) => (
        <MonthlyStats
          key={field.id}
          label={field.name}
          value={record[field.id]}
        />
      ))}
    </MonthWiseDetailsLayout>
  );
}

const MonthlyStats = React.memo(({ label, value }) => {
  const listItemOverrides = useMemo(() => {
    return {
      Content: {
        style: {
          minHeight: "36px"
        }
      }
    };
  }, []);
  return (
    <ListItem
      overrides={listItemOverrides}
      endEnhancer={() => <ListItemLabel>{value}</ListItemLabel>}
    >
      <ListItemLabel overrides={listItemOverrides}>{label}</ListItemLabel>
    </ListItem>
  );
});

const MonthWiseDetailsLayout = styled("ul", ({ $theme }) => ({
  minWidth: "240px",
  marginRight: "16px"
}));
