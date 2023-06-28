import { Note, Task } from "@prisma/client"

export const today = new Date()

export const createNote = (override?: any): Note => {
  const base = {
    id: "1",
    createdAt: today,
    title: "A Note",
    tags: [],
    dict: {},
  }

  return { ...base, ...override }
}

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
