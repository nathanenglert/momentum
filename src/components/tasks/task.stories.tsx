import type { Meta, StoryObj } from "@storybook/react"
import { add } from "date-fns"

import { createTask, today } from "@/lib/mock-objects"

import { Task } from "./task"

const meta: Meta<typeof Task> = {
  title: "Tasks/Task",
  component: Task,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Task>

export const Default: Story = {
  args: createTask(),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasDueDate: Story = {
  args: createTask({ dueAt: new Date() }),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasDueDateInPast: Story = {
  args: createTask({
    createdAt: add(today, { days: -1 }),
    dueAt: add(today, { days: -1 }),
  }),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasTag: Story = {
  args: createTask({ tags: [{ id: "1", name: "Foo" }] }),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasAged: Story = {
  args: createTask({ createdAt: add(today, { days: -2 }) }),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasHabitStreak: Story = {
  args: createTask({ habit: { streak: 2 } }),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
