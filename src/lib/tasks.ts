import { Task } from "@prisma/client"
import {
  differenceInCalendarDays,
  endOfDay,
  isBefore,
  isToday,
  startOfDay,
} from "date-fns"

export function calculateStreak(tasks: Task[], terminator: Date) {
  if (tasks.length === 0) return 0

  const startOfToday = startOfDay(terminator)
  const endOfToday = endOfDay(terminator)

  // Sort the tasks by completedAt date in ascending order
  const completedDates = tasks
    .filter((task) => task.completedAt && task.completedAt <= endOfToday)
    .map((task) => task.completedAt!)
  completedDates.sort((a: Date, b: Date) => a.getDate() - b.getDate())

  if (
    completedDates.length === 0 ||
    completedDates[completedDates.length - 1] < startOfToday
  )
    return 0

  let streak = 1

  // Iterate through the sorted tasks
  for (let i = 1; i < tasks.length; i++) {
    const previousDate = completedDates[i - 1]
    const currentDate = completedDates[i]

    // Calculate the difference in days between current and previous completedAt dates
    const dayDifference = differenceInCalendarDays(currentDate, previousDate)

    // If the difference is 1 day, increment current streak
    if (dayDifference === 1) streak++
    else if (dayDifference != 0) streak = 1
  }

  return streak
}

export function formatStreak(streak: number): string {
  if (streak == 1) return " to keep the streak"
  if (streak >= 2) return ` to keep streaking (${streak})`
  return ""
}

export function sortTasksByCriteria(tasks: Task[]): Task[] {
  tasks.sort((a, b) => {
    // Check if the task is due today
    const aDueToday = !!a.dueAt && isToday(a.dueAt)
    const bDueToday = !!b.dueAt && isToday(b.dueAt)

    // Compare based on the criteria
    if (!a.completedAt && !b.completedAt) {
      // 1. All tasks that are due today
      if (aDueToday && !bDueToday) return -1
      if (bDueToday && !aDueToday) return 1

      // 2. All tasks that do not have a due date
      if (!a.dueAt && !!b.dueAt) return -1
      if (!!a.dueAt && !b.dueAt) return 1
    }
    // 3. All other tasks that are due in the future
    if (!a.completedAt && !!b.completedAt) return -1
    if (!!a.completedAt && !b.completedAt) return 1

    // 4. All completed tasks, sorted by date
    return isBefore(a.completedAt!, b.completedAt!) ? -1 : 1
  })

  return tasks
}
