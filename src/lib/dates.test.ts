import { add } from "date-fns"

import { formatTime, getLifecycleStage, wasYesterdayOrEarlier } from "./dates"

const COMPLETED = true
const NOT_STARTED = false

describe("formatTime()", () => {
  ;[
    [{ days: 0 }, `today`],
    [{ days: 1 }, `tomorrow`],
    [{ days: 2 }, `2 days`],
    [{ weeks: 1 }, `1 week`],
    [{ days: 33 }, `1 month 3 days`],
    [{ days: -1 }, `past due`],
  ].forEach(([modifier, expected]) => {
    it(`should return \`${expected}\``, () => {
      const now = add(new Date(), modifier as Duration)
      const actual = formatTime(now)

      expect(actual).toContain(expected)
    })
  })
})

describe("getLifecycleStage()", () => {
  it("should return zero if a due date exists", () => {
    const created = new Date()
    const due = new Date()
    due.setDate(due.getDate() + 2)

    const actual = getLifecycleStage(NOT_STARTED, created, due)

    expect(actual).toEqual(0)
  })

  it("should return zero if completed", () => {
    const created = new Date()
    created.setDate(created.getDate() - 2)

    const actual = getLifecycleStage(COMPLETED, created)

    expect(actual).toEqual(0)
  })

  it("should return zero with a future date", () => {
    const created = new Date()
    created.setDate(created.getDate() + 2)

    const actual = getLifecycleStage(NOT_STARTED, created)

    expect(actual).toEqual(0)
  })

  it("should return zero with today's date", () => {
    const created = new Date()
    const actual = getLifecycleStage(NOT_STARTED, created)

    expect(actual).toEqual(0)
  })

  it("should return one with a recently past date", () => {
    const created = new Date()
    created.setDate(created.getDate() - 2)
    const actual = getLifecycleStage(NOT_STARTED, created)

    expect(actual).toEqual(1)
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
