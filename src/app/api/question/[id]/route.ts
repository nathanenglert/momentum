import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  const currentUserId = session?.user?.id!

  const check = await prisma.question.findUnique({ where: { id: params.id } })
  if (check?.userId !== currentUserId) {
    return NextResponse.error()
  }

  await prisma.question.delete({
    where: {
      id: params.id,
    },
  })

  return NextResponse.json({}, { status: 200 })
}
