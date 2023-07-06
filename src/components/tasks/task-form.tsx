"use client"

import { LogForm, LogFormProps } from "../core/log-form"

export function TaskForm({ dict, possibleTags }: LogFormProps) {
  const features = {
    dueDate: true,
    tags: true,
    frequency: true,
  }
  return (
    <LogForm
      type="task"
      features={features}
      dict={dict}
      possibleTags={possibleTags}
    />
  )
}
