"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export const TasksOverTime = ({
  data,
}: {
  data: { name: string; total: number }[]
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Line dataKey="total" stroke="#adfa1d" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
