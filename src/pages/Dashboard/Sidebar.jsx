import React, { useEffect, useMemo } from "react";
import { Navigation } from "baseui/side-navigation";
import { styled } from "baseui";
import { useData } from "../../providers/SeasonalTemperatureProvider";

export default function Sidebar() {
  const [activeItemId, setActiveItemId] = React.useState("#0");
  const { years: subNav, setSelectedRange } = useData();
  const onMenuChange = ({ item }) => setActiveItemId(item.itemId);

  useEffect(() => {
    const selectedIdx = (subNav || []).findIndex(
      (year) => year.itemId === activeItemId
    );
    console.log(selectedIdx);
    setSelectedRange(selectedIdx);
  }, [activeItemId, subNav, setSelectedRange]);

  return (
    <SidebarLayout>
      <Navigation
        items={[
          {
            title: "Years",
            subNav
          }
        ]}
        activeItemId={activeItemId}
        onChange={onMenuChange}
      />
    </SidebarLayout>
  );
}

const SidebarLayout = styled("div", ({ $theme }) => ({
  minWidth: "200px",
  backgroundColor: "rgba(255, 255, 255, 0.45)",
  backdropFilter: "blur(5px)",
  height: "100%",
  overflowY: "auto"
}));
