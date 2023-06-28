"use client"

import { LogOptions } from "../core/log-options"

export function NoteOptions({ id, dict }: { id: string; dict: any }) {
  return <LogOptions id={id} type="note" dict={dict} />
}
