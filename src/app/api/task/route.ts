import { NextResponse } from "next/server"
import { Tag } from "@prisma/client"
import { endOfToday } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { title, description, dueDate, tags, frequency } = await req.json()

  const dueAt = frequency && !dueDate ? endOfToday() : dueDate
  const record = await prisma.task.create({
    data: {
      userId: currentUserId,
      title,
      description,
      dueAt,
      tags: {
        connectOrCreate: tags.map((tag: Tag) => {
          return {
            where: { name: tag.name },
            create: { name: tag.name },
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
