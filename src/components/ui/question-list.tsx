import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import { Icons } from "../icons"

export interface Question {
  text: String
  type: String
}

export interface QuestionListProps {
  className?: String
  questions: Array<Question>
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

  return (
    <Card className={cn(className, "w-full")}>
      <CardHeader>
        <CardDescription>Questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-between items-center p-4">
          <div>
            <Button variant={`ghost`} onClick={decrement}>
              <Icons.chevronLeft />
            </Button>
          </div>
          <div>
            <p>{questions[index].text}</p>
            <div className="flex items-center justify-center gap-2 mt-4">
              {questions[index].type === "YES_NO" ? (
                <>
                  <Button variant={`outline`}>Yes</Button>
                  <Button variant={`outline`}>No</Button>
                </>
              ) : (
                <>
                  <Button variant={`outline`}>
                    <Icons.thumbsDown size={16} />
                    <Icons.thumbsDown size={16} />
                  </Button>
                  <Button variant={`outline`}>
                    <Icons.thumbsDown size={16} />
                  </Button>
                  <Button variant={`outline`}>
                    <Icons.thumbsUp size={16} />
                  </Button>
                  <Button variant={`outline`}>
                    <Icons.thumbsUp size={16} />
                    <Icons.thumbsUp size={16} />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div>
            <Button variant={`ghost`} onClick={increment}>
              <Icons.chevronRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
