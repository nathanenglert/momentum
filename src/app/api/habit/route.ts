import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId")!
  const habits = await prisma.habit.findMany({
    where: { userId },
  })

  return NextResponse.json(habits, { status: 200 })
}
