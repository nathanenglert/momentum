import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Combobox } from "./combobox"

const meta: Meta<typeof Combobox> = {
  title: "UI/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Combobox>

const ComboboxWithState = ({
  placeholder,
  className,
  items,
}: {
  placeholder: string
  className?: string
  items: any[]
}) => {
  const [value, setValue] = useState("")
  return (
    <Combobox
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      className={className}
      items={items}
    />
  )
}

export const Default: Story = {
  args: {
    placeholder: "Select something...",
    items: [
      { value: "alpha", label: "Alpha" },
      { value: "bravo", label: "Bravo" },
      { value: "charlie", label: "Charlie" },
    ],
  },
  render: ({ placeholder, className, items }) => (
    <ComboboxWithState
      placeholder={placeholder}
      className={className}
      items={items}
    />
  ),
}
