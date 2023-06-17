import { formatDistanceToNow } from "date-fns"

export function formatTime(d: Date) {
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

export function wasYesterdayOrEarlier(date: Date) {
  const today = new Date()
  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

  return date <= yesterday
}
