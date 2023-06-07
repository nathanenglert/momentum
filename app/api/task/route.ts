import { NextRequest, NextResponse } from "next/server"
import { Tag } from "@prisma/client"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { title, description, dueDate, tags } = await req.json()

  const record = await prisma.task.create({
    data: {
      userId: currentUserId,
      title,
      description,
      dueDate,
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

  return NextResponse.json(record, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const taskId = req.nextUrl.searchParams.get("taskId")!
  const { title, description, dueDate, status } = await req.json()

  const check = await prisma.task.findUnique({ where: { id: taskId } })
  if (check?.userId !== currentUserId) {
    return NextResponse.error()
  }

  const record = await prisma.task.update({
    where: { id: taskId },
    data: { title, description, dueDate, status },
  })

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
