"use client"

import HeatMap, { HeatMapValue } from "@uiw/react-heat-map"

// < Start of Major Hack >
const consoleError = console.error
const SUPPRESSED_WARNINGS = ["prop is being spread into JSX:", "at HeatMap"]

console.error = (msg, ...args) => {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleError(msg, ...args)
  }
}
// < End of Major Hack >

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
      weekLabels={false}
      monthLabels={false}
    />
  )
}
