"use client"

import { format } from "date-fns"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export const TasksOverTime = ({
  tasks,
}: {
  tasks: { completedAt: Date | null }[]
}) => {
  const tasksByDay = tasks.reduce((acc, curr) => {
    const date = format(curr.completedAt!, "MM/dd")
    if (acc[date]) {
      acc[date] += 1
    } else {
      acc[date] = 1
    }
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(tasksByDay)
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#94A3B8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(tick) => (tick[0] === "0" ? tick.slice(1) : tick)}
        />
        <YAxis
          stroke="#94A3B8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Line dataKey="total" stroke="#6CD968" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
