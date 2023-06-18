import { Task } from "@prisma/client"

import { createTask as createMockTask } from "@/lib/mock-objects"
import { prismaMock } from "@/lib/prisma-mock"

import { updateStreak } from "./logic"

describe("updateStreak", () => {
  it("should increment with different dates", async () => {
    const habitId = "foo"
    const completedAt = new Date(2023, 1, 1)
    const differentCompletedAt = new Date(2023, 1, 2)
    const task: Task = createMockTask({
      completedAt: completedAt,
      habitId: habitId,
    })

    await updateStreak(task, differentCompletedAt)
    expect(prismaMock.$executeRaw).toHaveBeenCalledWith(
      expect.arrayContaining([]),
      1,
      habitId
    )
  })

  it("should decrement with a null date", async () => {
    const habitId = "foo"
    const completedAt = new Date(2023, 1, 1)
    const differentCompletedAt = null
    const task: Task = createMockTask({
      completedAt: completedAt,
      habitId: habitId,
    })

    await updateStreak(task, differentCompletedAt)
    expect(prismaMock.$executeRaw).toHaveBeenCalledWith(
      expect.arrayContaining([]),
      -1,
      habitId
    )
  })

  it("should skip with same dates", async () => {
    const completedAt = new Date(2023, 1, 1)
    const task: Task = createMockTask({
      completedAt: completedAt,
    })

    await updateStreak(task, completedAt)
    expect(prismaMock.$executeRaw).not.toHaveBeenCalled()
  })
})
