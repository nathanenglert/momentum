"use client"

import HeatMap, { HeatMapValue } from "@uiw/react-heat-map"

export function HeatMapChart({
  values,
  startDate,
  endDate,
}: {
  values: HeatMapValue[]
  startDate: Date
  endDate: Date
}) {
  const colors = {
    0: "#1e293b",
    2: "#14532d",
    4: "#15803d",
    10: "#22c55e",
    20: "#86efac",
    30: "#dcfce7",
  }

  return (
    <HeatMap
      value={values}
      width={600}
      startDate={startDate}
      endDate={endDate}
      legendCellSize={0}
      panelColors={colors}
    />
  )
}
