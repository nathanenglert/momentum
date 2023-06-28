import type { Meta, StoryObj } from "@storybook/react"

import { createNote } from "@/lib/mock-objects"

import { Note } from "./note"

const meta: Meta<typeof Note> = {
  title: "Notes/Note",
  component: Note,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Note>

export const Default: Story = {
  args: createNote(),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export const HasTag: Story = {
  args: createNote({ tags: [{ id: "1", name: "Foo" }] }),
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}
