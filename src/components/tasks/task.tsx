"use client"

import { formatTime } from "@/lib/formatters"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { TaskCheckbox } from "./task-checkbox"

export interface TaskProps {
  id: string
  dueAt: Date | null
  habitId: string | null
  status: string
  title: string
  tags: {
    id: string
    name: string
  }[]
  dict: any
}

function wasYesterdayOrEarlier(date: Date) {
  // Create a new date object for today's date
  const today = new Date()

  // Set the time components to 0 (start of the day) for both dates
  date.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  // Subtract one day (in milliseconds) from today to get yesterday's date
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)

  // Check if the given date is less than or equal to yesterday
  return date <= yesterday
}

export function Task({ id, status, title, dueAt, tags, dict }: TaskProps) {
  const isPastDue = dueAt && wasYesterdayOrEarlier(dueAt)

  return (
    <li className="flex justify-between">
      <div className="flex items-center space-x-2">
        <TaskCheckbox id={id} status={status} dict={dict.status} />
        <label
          htmlFor={`done-${id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          )}
        >
          {title}
          {dueAt && status != `COMPLETED` && (
            <span
              className={cn("italic", {
                "text-destructive": isPastDue,
                "text-muted-foreground": !isPastDue,
              })}
            >
              {formatTime(dueAt)}
            </span>
          )}
        </label>
      </div>
      <div className="flex items-end gap-2">
        {tags?.map((tag) => (
          <Badge key={tag.id} variant={`outline`}>
            {tag.name}
          </Badge>
        ))}
      </div>
    </li>
  )
}
