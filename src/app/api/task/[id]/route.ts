import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { updateStreak } from "./logic"

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { title, description, dueAt, completedAt } = await req.json()

  const check = await prisma.task.findUnique({ where: { id: params.id } })
  if (check?.userId !== currentUserId) {
    return NextResponse.error()
  }

  const record = await prisma.task.update({
    where: { id: params.id },
    data: { title, description, dueAt, completedAt },
  })

  await updateStreak(check, completedAt)

  return NextResponse.json(record, { status: 200 })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  const check = await prisma.task.findUnique({ where: { id: params.id } })
  if (check?.userId !== currentUserId) {
    return NextResponse.error()
  }

  await prisma.task.delete({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json({}, { status: 200 })
}
