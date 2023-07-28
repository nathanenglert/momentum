import type { Meta, StoryObj } from "@storybook/react"

import { QuestionList } from "./question-list"

const meta: Meta<typeof QuestionList> = {
  title: "Questions/Question List",
  component: QuestionList,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof QuestionList>

export const Default: Story = {
  args: {
    questions: [
      { id: "1", text: "Are you still reading every day?", type: "YES_NO" },
      {
        id: "2",
        text: "How are you feeling about Cyberpunk today?",
        type: "SCALE",
      },
    ],
  },
}

export const YesNo: Story = {
  args: {
    questions: [
      { id: "1", text: "Are you still reading every day?", type: "YES_NO" },
    ],
  },
}

export const Scale: Story = {
  args: {
    questions: [
      {
        id: "1",
        text: "How are you feeling about Cyberpunk today?",
        type: "SCALE",
      },
    ],
  },
}

export const Empty: Story = {
  args: {
    questions: [],
  },
}
