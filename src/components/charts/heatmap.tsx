"use client"

import { useState } from "react"
import HeatMap, { HeatMapValue } from "@uiw/react-heat-map"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// < Start of Major Hack >
const consoleError = console.error
const SUPPRESSED_WARNINGS = ["prop is being spread into JSX:", "at HeatMap"]

console.error = (msg, ...args) => {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleError(msg, ...args)
  }
}
// < End of Major Hack >

export type TaggedHeatMapValue = HeatMapValue & {
  tags: string[]
}

export function HeatMapChart({
  values,
  startDate,
  endDate,
}: {
  values: TaggedHeatMapValue[]
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
  const [tagFilter, setTagFilter] = useState<string | null>(null)

  const tags = values.reduce((acc, curr) => {
    curr.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag)
      }
    })
    return acc
  }, [] as string[])
  const filtered = values
    .filter((value) => !tagFilter || value.tags.includes(tagFilter))
    .map((value) => ({
      date: value.date,
      count: value.count,
    }))
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.date === curr.date)
      if (existing) {
        existing.count += 1
      } else {
        acc.push(curr as HeatMapValue)
      }
      return acc
    }, [] as HeatMapValue[])

  return (
    <div className="flex justify-start gap-2">
      <div className="pl-[5px] py-[5px]">
        <Select
          onValueChange={(value) => setTagFilter(value)}
          defaultValue={tagFilter || undefined}
        >
          <SelectTrigger className="h-auto py-1 px-2 rounded-sm w-[120px] bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={""}>All</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <HeatMap
        value={filtered}
        startDate={startDate}
        endDate={endDate}
        legendCellSize={0}
        panelColors={colors}
        weekLabels={false}
        monthLabels={false}
      />
    </div>
  )
}
