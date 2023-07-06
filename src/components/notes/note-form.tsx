"use client"

import { LogForm, LogFormProps } from "../core/log-form"

export function NoteForm({ dict, possibleTags }: LogFormProps) {
  const features = {
    tags: true,
  }
  return (
    <LogForm
      type="note"
      features={features}
      dict={dict}
      possibleTags={possibleTags}
    />
  )
}
