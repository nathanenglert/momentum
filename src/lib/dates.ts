import {
  differenceInCalendarDays,
  formatDistanceToNow,
  isAfter,
} from "date-fns"

export function formatTime(d: Date): string {
  const today = new Date()
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const seconds = today.getSeconds()
  const milliseconds = today.getMilliseconds()

  d.setHours(hours, minutes, seconds, milliseconds)

  if (d.getDate() < today.getDate()) return ` is past due`
  if (d.getDate() == today.getDate()) return ` due today`
  if (d.getDate() == today.getDate() + 1) return ` due tomorrow`

  return ` in ${formatDistanceToNow(d)}`
}

export function getLifecycleStage(
  isCompleted: boolean,
  created: Date,
  due?: Date | null
): 0 | 1 | 2 | 3 {
  const today = new Date()

  if (isCompleted || due || isAfter(created, today)) return 0

  const age = differenceInCalendarDays(created, today)
  if (age <= -6) return 3
  if (age <= -4) return 2
  if (age <= -2) return 1

  return 0
}

export function wasYesterdayOrEarlier(date: Date): boolean {
  const today = new Date()
  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

  return date <= yesterday
}
