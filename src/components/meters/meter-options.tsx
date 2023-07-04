"use client"

import { LogOptions } from "../core/log-options"

export function MeterOptions({ id, dict }: { id: string; dict: any }) {
  return <LogOptions id={id} type="meter" dict={dict} />
}
