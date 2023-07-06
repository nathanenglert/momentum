import { add, endOfToday, format, startOfToday } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { HeatMapChart, TaggedHeatMapValue } from "@/components/charts/heatmap"
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
    include: {
      tags: true,
    },
  })

  const values = tasks.map((task) => ({
    date: format(task.completedAt!, "yyyy/M/d"),
    tags: task.tags.map((tag) => tag.name),
    count: 1,
  })) as TaggedHeatMapValue[]

  return (
    <HeatMapChart values={values} startDate={startDate} endDate={endDate} />
  )
}
