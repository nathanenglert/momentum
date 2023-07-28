import { Question } from "@prisma/client"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export interface QuestionProps {
  question: Question
  onAnswer: (answer: number) => void
  disabled?: boolean
}

interface QuestionItemProps {
  text: string
  children: React.ReactNode
}

function BaseQuestionItem({ text: questionText, children }: QuestionItemProps) {
  return (
    <div>
      <p>{questionText}</p>
      <div className="flex items-center justify-center gap-2 mt-4">
        {children}
      </div>
    </div>
  )
}

export function BaseYesNoQuestion({
  question,
  disabled,
  onAnswer,
}: QuestionProps) {
  return (
    <BaseQuestionItem text={question.text}>
      <Button
        variant={`outline`}
        disabled={disabled}
        onClick={() => onAnswer(1)}
      >
        Yes
      </Button>
      <Button
        variant={`outline`}
        disabled={disabled}
        onClick={() => onAnswer(0)}
      >
        No
      </Button>
    </BaseQuestionItem>
  )
}

export function BaseScaleQuestion({
  question,
  disabled,
  onAnswer,
}: QuestionProps) {
  return (
    <BaseQuestionItem text={question.text}>
      <Button
        variant={`outline`}
        disabled={disabled}
        onClick={() => onAnswer(-2)}
      >
        <Icons.thumbsDown size={16} />
        <Icons.thumbsDown size={16} />
      </Button>
      <Button
        variant={`outline`}
        disabled={disabled}
        onClick={() => onAnswer(-1)}
      >
        <Icons.thumbsDown size={16} />
      </Button>
      <Button
        variant={`outline`}
        disabled={disabled}
        onClick={() => onAnswer(1)}
      >
        <Icons.thumbsUp size={16} />
      </Button>
      <Button
        variant={`outline`}
        disabled={disabled}
        onClick={() => onAnswer(2)}
      >
        <Icons.thumbsUp size={16} />
        <Icons.thumbsUp size={16} />
      </Button>
    </BaseQuestionItem>
  )
}
