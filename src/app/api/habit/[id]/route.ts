import { NextResponse } from "next/server"
import { Habit, Tag } from "@prisma/client"
import { add, format, isFuture } from "date-fns"

import { wasYesterdayOrEarlier } from "@/lib/dates"
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

const findNextDate = async (lastDue: Date, title: string, habit: Habit) => {
  const interval = frequencyToInterval(habit.frequency)
  let nextDate = add(lastDue, interval)
  let iteration = 0

  while (wasYesterdayOrEarlier(nextDate)) {
    const dateStr = format(nextDate, "MMMM d")
    await prisma.question.create({
      data: {
        text: `Did you complete [${title}] on ${dateStr}?`,
        type: "MISSED_HABIT",
        userId: habit.userId,
        reference: JSON.stringify({ id: habit.id, forDate: nextDate }),
      },
    })

    if (iteration > 30)
      throw new Error("Could not find a valid date for next task")

    nextDate = add(nextDate, interval)
    iteration += 1
  }

  return nextDate
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

  const { forDate, autoComplete } = await req.json()

  if (!forDate && isFuture(lastTask.dueAt!))
    return new Response(null, { status: 204 })

  let nextDate
  if (!!forDate) nextDate = forDate
  else {
    nextDate = await findNextDate(lastTask.dueAt!, lastTask.title!, habit)
  }

  const nextTask = await prisma.task.create({
    data: {
      userId: lastTask.userId,
      title: lastTask.title!,
      description: lastTask.description,
      dueAt: nextDate,
      habitId: params.id,
      completedAt: autoComplete ? new Date() : undefined,
      tags: {
        connect: lastTask.tags.map((tag: Tag) => ({ id: tag.id })),
      },
    },
  })

  return NextResponse.json(nextTask, { status: 201 })
}
