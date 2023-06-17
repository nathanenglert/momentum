import { Task } from "@prisma/client"

import { calculateStreak, formatStreak } from "./tasks"

describe("calculateStreak()", () => {
  ;[
    [1, [{ completedAt: new Date(2023, 1, 1) }], new Date(2023, 1, 1)],
    [
      2,
      [
        { completedAt: new Date(2023, 1, 1) },
        { completedAt: new Date(2023, 1, 2) },
      ],
      new Date(2023, 1, 2),
    ],
    [
      3,
      [
        { completedAt: new Date(2023, 1, 1) },
        { completedAt: new Date(2023, 1, 2) },
        { completedAt: new Date(2023, 1, 3) },
      ],
      new Date(2023, 1, 3),
    ],
    [
      2,
      [
        { completedAt: new Date(2023, 1, 1) },
        { completedAt: new Date(2023, 1, 3) },
        { completedAt: new Date(2023, 1, 4) },
      ],
      new Date(2023, 1, 4),
      "when there is a gap",
    ],
    [
      0,
      [{ completedAt: null }],
      new Date(2023, 1, 1),
      "when nothing is completed",
    ],
    [
      0,
      [{ completedAt: new Date(2023, 1, 1) }, { completedAt: null }],
      new Date(2023, 1, 2),
      "when the last isn't completed",
    ],
    [
      1,
      [
        { completedAt: new Date(2023, 1, 1) },
        { completedAt: new Date(2023, 1, 3) },
      ],
      new Date(2023, 1, 1),
      "when the last is in the future",
    ],
  ].map(([expected, tasks, terminator, comment]) => {
    it(`should return ${expected} ${comment || ""}`, () => {
      const actual = calculateStreak(tasks as Task[], terminator as Date)
      expect(actual).toEqual(expected)
    })
  })
})

describe("formatSteak()", () => {
  it("should return empty", () => {
    const actual = formatStreak(0)
    expect(actual).toEqual("")
  })

  it("should highlight the streak", () => {
    const actual = formatStreak(1)
    expect(actual).toContain("streak")
  })

  it("should display the streak total when greater than 1", () => {
    const actual = formatStreak(2)
    expect(actual).toContain("2")
  })
})
