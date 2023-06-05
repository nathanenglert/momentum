"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Checkbox } from "../ui/checkbox"

export interface TaskCheckboxProps {
  id: string
  status: string
}

export function TaskCheckbox({ id, status }: TaskCheckboxProps) {
  const router = useRouter()
  const [isChecked, setChecked] = useState(status === `COMPLETED`)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const handleChange = async () => {
    const newState = !isChecked

    setChecked(newState)
    setIsFetching(true)

    const res = await fetch(`/api/task?taskId=${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: newState ? `COMPLETED` : `NOT_STARTED`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  return (
    <Checkbox
      id={`done-${id}`}
      checked={isChecked}
      disabled={isMutating}
      onClick={handleChange}
      title={id}
    />
  )
}
