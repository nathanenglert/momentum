import { Task } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export async function updateStreak(task: Task, completedAt: Date | null) {
  if (task.habitId && task.completedAt != completedAt) {
    const modifier = !!completedAt ? 1 : -1
    await prisma.$executeRaw`update "Habit" set streak = streak + ${modifier} where id = ${task.habitId}`
  }
}
