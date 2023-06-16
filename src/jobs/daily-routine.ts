import { prisma } from "@/lib/prisma"

;(async () => {
  const habits = await prisma.habit.findMany()
  console.log(habits.length)
})()
