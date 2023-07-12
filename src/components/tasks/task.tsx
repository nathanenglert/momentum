"use client"

import { cva } from "class-variance-authority"

import {
  formatTime,
  getLifecycleStage,
  wasYesterdayOrEarlier,
} from "@/lib/dates"
import { formatStreak } from "@/lib/tasks"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { TaskCheckbox } from "./task-checkbox"
import { TaskOptions } from "./task-options"

const taskVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      lifecycle: {
        0: "text-sm",
        1: "text-md",
        2: "text-l",
        3: "text-xl",
      },
    },
    defaultVariants: {
      lifecycle: 0,
    },
  }
)

export interface TaskProps {
  id: string
  createdAt: Date
  dueAt: Date | null
  habit: {
    id: string
    streak: number
  } | null
  completedAt: Date | null
  title: string
  tags: {
    id: string
    name: string
  }[]
  dict: any
}

export function Task({
  id,
  completedAt,
  createdAt,
  dueAt,
  habit,
  tags,
  title,
  dict,
}: TaskProps) {
  const isCompleted = !!completedAt
  const isPastDue = !!dueAt && wasYesterdayOrEarlier(dueAt)
  const lifecycle = getLifecycleStage(isCompleted, createdAt, dueAt)

  return (
    <li className="flex justify-between">
      <div className="flex items-center space-x-2">
        <TaskCheckbox
          id={id}
          className={`mx-4`}
          isCompleted={isCompleted}
          dict={dict.status}
        />
        <label
          htmlFor={`done-${id}`}
          className={cn(taskVariants({ lifecycle }))}
        >
          {title}
          {!!dueAt && !completedAt && (
            <span
              className={cn("italic", {
                "text-destructive": isPastDue,
                "text-muted-foreground": !isPastDue,
              })}
            >
              {formatTime(dueAt)}
            </span>
          )}
          {habit && habit.streak > 0 && !completedAt && (
            <span className="italic text-muted-foreground">
              {formatStreak(habit.streak)}
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
        <TaskOptions
          id={id}
          dict={dict.status}
          dueAt={dueAt}
          completedAt={completedAt}
        />
      </div>
    </li>
  )
}
