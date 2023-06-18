"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Checkbox } from "../ui/checkbox"
import { useToast } from "../ui/use-toast"

export interface TaskCheckboxProps {
  id: string
  isCompleted: boolean
  dict: any
}

export function TaskCheckbox({ id, isCompleted, dict }: TaskCheckboxProps) {
  const router = useRouter()
  const [isChecked, setChecked] = useState(isCompleted)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const { toast } = useToast()
  const isMutating = isFetching || isPending

  const handleChange = async () => {
    const complete = !isChecked

    setChecked(complete)
    setIsFetching(true)

    const completedAt = complete ? new Date() : null
    const res = await fetch(`/api/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        completedAt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (complete) {
      toast({
        description: dict.complete.toast,
      })
    }

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
