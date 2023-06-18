import { NextRequest, NextResponse } from "next/server"
import { Tag } from "@prisma/client"
import { endOfDay } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { updateStreak } from "./logic"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { title, description, dueDate, tags, frequency } = await req.json()

  const dueAt = frequency && !dueDate ? endOfDay(new Date()) : dueDate
  const record = await prisma.task.create({
    data: {
      userId: currentUserId,
      title,
      description,
      dueAt,
      tags: {
        connectOrCreate: tags.map((tag: Tag) => {
          return {
            where: { name: tag },
            create: { name: tag },
          }
        }),
      },
    },
  })

  if (frequency) {
    await prisma.habit.create({
      data: {
        frequency,
        originTaskId: record.id,
        userId: currentUserId,
        tasks: {
          connect: { id: record.id },
        },
      },
    })
  }

  return NextResponse.json(record, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const taskId = req.nextUrl.searchParams.get("taskId")!
  const { title, description, dueAt, completedAt } = await req.json()

  const check = await prisma.task.findUnique({ where: { id: taskId } })
  if (check?.userId !== currentUserId) {
    return NextResponse.error()
  }

  const record = await prisma.task.update({
    where: { id: taskId },
    data: { title, description, dueAt, completedAt },
  })

  await updateStreak(check, completedAt)

  return NextResponse.json(record, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const taskId = req.nextUrl.searchParams.get("taskId")!

  const check = await prisma.task.findUnique({ where: { id: taskId } })
  if (check?.userId !== currentUserId) {
    return NextResponse.error()
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  })

  return NextResponse.json({}, { status: 204 })
}
