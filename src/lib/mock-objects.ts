import { Task } from "@prisma/client"

export const today = new Date()
export const createTask = (override?: any): Task => {
  const base = {
    id: "1",
    createdAt: today,
    title: "A Task",
    tags: [],
    dict: {},
  }

  return { ...base, ...override }
}
