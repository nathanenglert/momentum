import { NextResponse } from "next/server"
import { add, isFuture } from "date-fns"

import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const habit = await prisma.habit.findMany({
    where: { id: params.id },
  })

  return NextResponse.json(habit, { status: 200 })
}

const frequencyToInterval = (frequency: string) => {
  switch (frequency) {
    case "DAILY":
      return { days: 1 }
    case "WEEKLY":
      return { weeks: 1 }
    case "MONTHLY":
      return { months: 1 }
  }
  return {}
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const habit = await prisma.habit.findUnique({
    where: { id: params.id },
  })

  const lastTask = await prisma.task.findFirst({
    where: { habitId: params.id },
    orderBy: { dueAt: "desc" },
    include: { tags: true },
  })

  if (!habit || !lastTask) return NextResponse.json({}, { status: 500 })
  if (isFuture(lastTask.dueAt!)) return NextResponse.json({}, { status: 204 })

  const interval = frequencyToInterval(habit.frequency)
  const nextDate = add(lastTask.dueAt!, interval)
  const nextTask = await prisma.task.create({
    data: {
      userId: lastTask.userId,
      title: lastTask.title!,
      description: lastTask.description,
      dueAt: nextDate,
      habitId: params.id,
      tags: { connect: lastTask.tags },
    },
  })

  return NextResponse.json(nextTask, { status: 201 })
}
