"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export const TasksOverTime = ({
  tasks,
}: {
  tasks: { completedAt: Date | null }[]
}) => {
  const tasksByDay = tasks.reduce((acc, curr) => {
    const date = new Date(curr.completedAt!).toLocaleDateString()
    if (acc[date]) {
      acc[date] += 1
    } else {
      acc[date] = 1
    }
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(tasksByDay).map(([name, total]) => ({
    name,
    total,
  }))

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
        <Line dataKey="total" stroke="#6CD968" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
