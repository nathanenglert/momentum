"use client"

import * as React from "react"
import { Question } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import { Icons } from "../icons"
import { MissedHabitQuestion } from "./missed-habit-question"
import { BaseScaleQuestion, BaseYesNoQuestion } from "./question-item"

export interface QuestionListProps {
  className?: String
  questions: Question[]
}

function getQuestionComponent(question: Question): React.ReactNode {
  switch (question.type) {
    case "MISSED_HABIT":
      return <MissedHabitQuestion question={question} />
    case "YES_NO":
      return <BaseYesNoQuestion question={question} onAnswer={() => {}} />
    case "SCALE":
      return <BaseScaleQuestion question={question} onAnswer={() => {}} />
  }

  return <>Oops, we have a problem.</>
}

export function QuestionList({ className, questions }: QuestionListProps) {
  const [index, setIndex] = React.useState(0)
  const numQuestions = questions.length

  if (numQuestions === 0) {
    return <></>
  }

  const increment = () => {
    setIndex((index + 1) % numQuestions)
  }

  const decrement = () => {
    setIndex((index + numQuestions - 1) % numQuestions)
  }

  const QuestionComponent = getQuestionComponent(questions[index])

  return (
    <Card className={cn(className, "w-full")}>
      <CardHeader>
        <CardDescription>Questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between items-center p-4">
          <div>
            <Button variant={`ghost`} onClick={decrement} disabled={index == 0}>
              <Icons.chevronLeft />
            </Button>
          </div>
          {QuestionComponent}
          <div>
            <Button
              variant={`ghost`}
              onClick={increment}
              disabled={index == questions.length - 1}
            >
              <Icons.chevronRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
