import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!
  const { title, tags } = await req.json()

  const record = await prisma.meter.create({
    data: {
      userId: currentUserId,
      title,
      tags: {
        connectOrCreate: tags.map((tag: string) => {
          return {
            where: { name: tag },
            create: { name: tag, tasks: { create: [] } },
          }
        }),
      },
    },
  })

  return NextResponse.json(record, { status: 201 })
}
