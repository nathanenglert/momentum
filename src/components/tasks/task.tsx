"use client"

import { cva } from "class-variance-authority"

import {
  formatTime,
  getLifecycleStage,
  wasYesterdayOrEarlier,
} from "@/lib/dates"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { TaskCheckbox } from "./task-checkbox"

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
  habitId: string | null
  status: string
  title: string
  tags: {
    id: string
    name: string
  }[]
  dict: any
}

export function Task({
  id,
  status,
  title,
  createdAt,
  dueAt,
  tags,
  dict,
}: TaskProps) {
  const isPastDue = dueAt && wasYesterdayOrEarlier(dueAt)
  const lifecycle = getLifecycleStage(createdAt, dueAt)

  return (
    <li className="flex justify-between">
      <div className="flex items-center space-x-2">
        <TaskCheckbox id={id} status={status} dict={dict.status} />
        <label
          htmlFor={`done-${id}`}
          className={cn(taskVariants({ lifecycle }))}
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
