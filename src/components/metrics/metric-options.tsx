"use client"

import { LogOptions } from "../core/log-options"

export function MetricOptions({ id, dict }: { id: string; dict: any }) {
  return <LogOptions id={id} type="metric" dict={dict} />
}
