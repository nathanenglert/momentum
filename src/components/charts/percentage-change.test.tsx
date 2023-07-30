import { composeStories } from "@storybook/testing-react"
import { render, screen } from "@testing-library/react"

import { PercentageChange, testIDs } from "./percentage-change"
import * as stories from "./percentage-change.stories"

const { PositiveChange, NoChange, NegativeChange } = composeStories(stories)

describe("<PercentageChange>", () => {
  it("renders a positive change", () => {
    render(<PositiveChange />)
    expect(screen.getByText("+100% from last month")).not.toBeNull()
    expect(screen.getByTestId(testIDs.positiveIcon)).not.toBeNull()
  })

  it("renders no change", () => {
    render(<NoChange />)
    expect(screen.getByText("no change from last month")).not.toBeNull()
    expect(screen.queryByTestId(testIDs.positiveIcon)).toBeNull()
    expect(screen.queryByTestId(testIDs.negativeIcon)).toBeNull()
  })

  it("renders a negative change", () => {
    render(<NegativeChange />)
    expect(screen.getByText("-50% from last month")).not.toBeNull()
    expect(screen.getByTestId(testIDs.negativeIcon)).not.toBeNull()
  })
  //
  ;[
    ["+25%", 5, 4],
    ["-25%", 3, 4],
    ["+33%", 4, 3],
  ].map(([text, current, previous]) => {
    it(`renders ${text} for ${current} and ${previous}`, () => {
      render(
        <PercentageChange
          current={current as number}
          previous={previous as number}
        />
      )
      const element = screen.getByText(`${text} from last month`)
      expect(element).not.toBeNull()
    })
  })
})
