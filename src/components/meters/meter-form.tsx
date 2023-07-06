"use client"

import { LogForm, LogFormProps } from "../core/log-form"

export function MeterForm({ dict, possibleTags }: LogFormProps) {
  const features = {
    tags: true,
  }
  return (
    <LogForm
      type="meter"
      features={features}
      dict={dict}
      possibleTags={possibleTags}
    />
  )
}
