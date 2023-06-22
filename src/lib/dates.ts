import {
  differenceInCalendarDays,
  endOfYesterday,
  formatDuration,
  isAfter,
  isBefore,
  isToday,
  isTomorrow,
} from "date-fns"

export function formatTime(d: Date): string {
  if (wasYesterdayOrEarlier(d)) return ` is past due`
  if (isToday(d)) return ` due today`
  if (isTomorrow(d)) return ` due tomorrow`
  const totalDays = differenceInCalendarDays(d, new Date())
  const months = Math.floor(totalDays / 30)
  const weeks = Math.floor((totalDays - months * 30) / 7)
  const days = totalDays - months * 30 - weeks * 7
  return ` in ${formatDuration({ months, weeks, days })}`
}

export function getLifecycleStage(
  isCompleted: boolean,
  created: Date,
  due?: Date | null
): 0 | 1 | 2 | 3 {
  const today = new Date()

  if (isCompleted || !!due || isAfter(created, today)) return 0

  const age = differenceInCalendarDays(created, today)
  if (age <= -6) return 3
  if (age <= -4) return 2
  if (age <= -2) return 1

  return 0
}

export function wasYesterdayOrEarlier(date: Date): boolean {
  const yesterday = endOfYesterday()
  return isBefore(date, yesterday)
}
