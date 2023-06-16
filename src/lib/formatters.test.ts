import { formatTime } from "./formatters"

describe("formatTime", () => {
  it("should return `today`", () => {
    const now = new Date()
    const actual = formatTime(now)

    expect(actual).toContain("today")
  })

  it("should return `tomorrow`", () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const actual = formatTime(tomorrow)

    expect(actual).toContain("tomorrow")
  })

  it("should return `n days`", () => {
    const day = new Date()
    day.setDate(day.getDate() + 2)
    const actual = formatTime(day)

    expect(actual).toContain("2 days")
  })
})
