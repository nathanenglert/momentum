import { HeatMapValue } from "@uiw/react-heat-map"
import { add, endOfToday, format, startOfToday } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { HeatMapChart } from "@/components/charts/heatmap"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function TaskActivity() {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const endDate = endOfToday()
  const startDate = add(startOfToday(), { days: -90 })

  const tasks = await prisma.task.findMany({
    where: {
      completedAt: {
        not: null,
        gte: startDate,
      },
      userId: currentUserId,
    },
    orderBy: {
      completedAt: "asc",
    },
  })

  const values = tasks
    .map((task) => ({
      date: format(task.completedAt!, "yyyy/M/d"),
      count: 1,
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
    <HeatMapChart values={values} startDate={startDate} endDate={endDate} />
  )
}
