import { NextResponse } from "next/server"
import { Tag } from "@prisma/client"
import { endOfToday } from "date-fns"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { title, description, dueAt, tags, frequency } = await req.json()

  const dueDate = frequency && !dueAt ? endOfToday() : dueAt
  const record = await prisma.task.create({
    data: {
      userId: currentUserId,
      title,
      description,
      dueAt: dueDate,
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
