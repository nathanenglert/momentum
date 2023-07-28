"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Question } from "@prisma/client"

import { useToast } from "../ui/use-toast"
import { BaseYesNoQuestion } from "./question-item"

export function MissedHabitQuestion({ question }: { question: Question }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { toast } = useToast()

  const updateHabit = async (): Promise<boolean> => {
    const reference = JSON.parse(question.reference!)
    const response = await fetch(`/api/habit/${reference.id}`, {
      method: "POST",
      body: JSON.stringify({
        forDate: reference.forDate,
        autoComplete: true,
      }),
    })

    return response.ok
  }

  const removeQuestion = async (): Promise<boolean> => {
    const response = await fetch(`/api/question/${question.id}`, {
      method: "DELETE",
    })

    return response.ok
  }

  const handleAnswer = async (answer: number) => {
    setIsFetching(true)

    if (answer === 1) {
      if (!(await updateHabit())) {
        toast({
          description: "Something went wrong",
        })
        setIsFetching(false)
        return
      }
    }

    await removeQuestion()

    toast({
      description: "Donezo",
    })

    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  return (
    <BaseYesNoQuestion
      question={question}
      onAnswer={handleAnswer}
      disabled={isMutating}
    />
  )
}
