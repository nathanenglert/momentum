import { composeStories } from "@storybook/testing-react"
import { render, screen } from "@testing-library/react"

import { testIDs } from "./metric-display"
import * as stories from "./metric-display.stories"

const { Default, WithIcon, WithPrevious } = composeStories(stories)

describe("<MetricDisplay>", () => {
  it("renders the default", () => {
    render(<Default />)

    expect(screen.getByText("A Metric")).not.toBeNull()
    expect(screen.getByText("100")).not.toBeNull()
  })

  it("renders with an icon", () => {
    render(<WithIcon />)

    expect(screen.getByText("A Metric")).not.toBeNull()
    expect(screen.getByText("100")).not.toBeNull()
    expect(screen.getByTestId(testIDs.icon)).not.toBeNull()
  })

  it("renders with a previous value", () => {
    render(<WithPrevious />)

    expect(screen.getByText("A Metric")).not.toBeNull()
    expect(screen.getByText("100")).not.toBeNull()
    expect(screen.getByText("+100% from last month")).not.toBeNull()
  })
})
