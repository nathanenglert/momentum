"use client"

import { LogOptions } from "../core/log-options"

export function TaskOptions({
  id,
  dict,
  dueAt,
  completedAt,
}: {
  id: string
  dict: any
  dueAt: Date | null
  completedAt: Date | null
}) {
  return (
    <LogOptions
      id={id}
      type="task"
      dict={dict}
      dueAt={dueAt}
      completedAt={completedAt}
    />
  )
}
