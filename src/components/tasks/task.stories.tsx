import type { Meta, StoryObj } from "@storybook/react"

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
  args: {
    id: "1",
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
    dueAt: new Date(2023, 1, 1),
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
