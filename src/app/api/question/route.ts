import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  const records = await prisma.question.findMany({
    where: { userId: currentUserId },
  })

  return NextResponse.json(records, { status: 200 })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { text, type, reference } = await req.json()

  const record = await prisma.question.create({
    data: {
      userId: currentUserId,
      text,
      type,
      reference,
    },
  })

  return NextResponse.json(record, { status: 201 })
}
