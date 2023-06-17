import { formatTime, wasYesterdayOrEarlier } from "./dates"

describe("formatTime()", () => {
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

  it("should return `past due`", () => {
    const day = new Date()
    day.setDate(day.getDate() - 1)
    const actual = formatTime(day)

    expect(actual).toContain("past due")
  })
})

describe("wasYesterdayOrEarlier()", () => {
  it("should return true with past date", () => {
    const day = new Date()
    day.setDate(day.getDate() - 1)
    const actual = wasYesterdayOrEarlier(day)

    expect(actual).toBeTruthy()
  })

  it("should return false with today's date", () => {
    const day = new Date()
    const actual = wasYesterdayOrEarlier(day)

    expect(actual).toBeFalsy()
  })

  it("should return true with future date", () => {
    const day = new Date()
    day.setDate(day.getDate() + 1)
    const actual = wasYesterdayOrEarlier(day)

    expect(actual).toBeFalsy()
  })
})
