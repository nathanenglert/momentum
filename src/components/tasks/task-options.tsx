"use client"

import { LogOptions } from "../core/log-options"

export function TaskOptions({ id, dict }: { id: string; dict: any }) {
  return <LogOptions id={id} type="task" dict={dict} />
}
