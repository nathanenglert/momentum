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
    0: "#EBEDF0",
    2: "#C6E48B",
    4: "#7BC96F",
    10: "#239A3B",
    20: "#196127",
    30: "#000",
  }
  console.log(values)
  return (
    <HeatMap
      value={values}
      width={600}
      startDate={startDate}
      endDate={endDate}
      panelColors={colors}
    />
  )
}
