import { formatDistanceToNow } from "date-fns"

export const formatTime = (d: Date) => {
  const today = new Date()
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const seconds = today.getSeconds()
  const milliseconds = today.getMilliseconds()

  d.setHours(hours, minutes, seconds, milliseconds)

  if (d.getDate() <= today.getDate()) return ` due today`
  if (d.getDate() == today.getDate() + 1) return ` due tomorrow`

  return ` in ${formatDistanceToNow(d)}`
}
