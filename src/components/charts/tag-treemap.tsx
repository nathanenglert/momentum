"use client"

import { PureComponent, memo } from "react"
import { Treemap } from "recharts"

export const TagTreemap = ({
  tags,
}: {
  tags: { name: string; size: number }[]
}) => {
  return (
    <Treemap
      height={200}
      width={600}
      data={tags}
      dataKey="size"
      aspectRatio={600 / 200}
      // stroke="#94A3B8"
      fill="#020817"
      isAnimationActive={false}
      content={<CustomizedContent />}
    />
  )
}

export const space = 16
export const CustomizedContent = memo(
  ({
    depth,
    x,
    y,
    width,
    height,
    name,
  }: {
    depth?: number
    x?: number
    y?: number
    width?: number
    height?: number
    name?: string
  }) => (
    <g>
      <rect
        x={x! === 0 ? 0 : x! + space}
        y={y! === 0 ? 0 : y! + space}
        width={x! === 0 ? width! : width! - space}
        height={y! === 0 ? height! : height! - space}
        rx={depth === 1 ? 10 : 0}
        style={{
          stroke: depth === 1 ? "#1E293B" : "",
          strokeOpacity: 1 / (depth! + 1e-10),
        }}
      />
      {depth === 1 && width! > 80 && height! > 20 ? (
        <text
          x={x! + space / 2 + width! / 2}
          y={y! === 0 ? height! / 2 + 4 : y! + space / 2 + height! / 2 + 4}
          textAnchor="middle"
          fill="#F8FAFC"
          fontSize={14}
        >
          {name}
        </text>
      ) : null}
    </g>
  )
)
