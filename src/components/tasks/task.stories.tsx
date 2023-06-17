import type { Meta, StoryObj } from "@storybook/react"
import { add } from "date-fns"

import { Task } from "./task"

const meta: Meta<typeof Task> = {
  title: "Tasks/Task",
  component: Task,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Task>

const today = new Date()

export const Default: Story = {
  args: {
    id: "1",
    createdAt: today,
    status: "NOT_STARTED",
    title: "A Task",
    tags: [],
    dict: {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasDueDate: Story = {
  args: {
    id: "1",
    createdAt: today,
    dueAt: new Date(),
    status: "NOT_STARTED",
    title: "A Task",
    tags: [],
    dict: {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasDueDateInPast: Story = {
  args: {
    id: "1",
    createdAt: add(today, { days: -1 }),
    dueAt: add(today, { days: -1 }),
    status: "NOT_STARTED",
    title: "A Task",
    tags: [],
    dict: {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasTag: Story = {
  args: {
    id: "1",
    createdAt: today,
    status: "NOT_STARTED",
    title: "A Task",
    tags: [{ id: "1", name: "Foo" }],
    dict: {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasAged: Story = {
  args: {
    id: "1",
    createdAt: add(today, { days: -2 }),
    status: "NOT_STARTED",
    title: "A Task",
    tags: [],
    dict: {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
