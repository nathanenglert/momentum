import { forwardRef, useEffect, useRef, useState } from "react"

import { Input, InputProps } from "./input"

export interface QuickInputProps extends InputProps {
  useLengthWarning?: boolean
  onQuickEnter: () => void
}

const QuickInput = forwardRef<HTMLInputElement, QuickInputProps>(
  ({ onQuickEnter, useLengthWarning = true, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [hasLengthWarning, setHasLengthWarning] = useState(false)

    const handleKeyDown = (event: KeyboardEvent) => {
      setHasLengthWarning(
        useLengthWarning &&
          !!inputRef.current &&
          inputRef.current.value.length > 40
      )

      // Check if Command (metaKey) is pressed along with the Enter key
      if (event.metaKey && event.key === "Enter") {
        onQuickEnter()
      }
    }

    useEffect(() => {
      const inputElement = inputRef.current

      // Add the event listener to the input element
      if (!!inputElement) {
        inputElement.addEventListener("keydown", handleKeyDown)
      }

      // Clean up the event listener when the component unmounts
      return () => {
        if (!!inputElement) {
          inputElement.removeEventListener("keydown", handleKeyDown)
        }
      }
    }, [])

    return (
      <>
        <Input
          ref={(element) => {
            inputRef.current = element
            if (!ref) return
            if (typeof ref === "function") {
              ref(element)
            } else {
              ref.current = element
            }
          }}
          {...props}
        />
        {hasLengthWarning && (
          <p className="text-sm font-medium text-warning">
            The text may be a little long.
          </p>
        )}
      </>
    )
  }
)
QuickInput.displayName = "Quick Input"

export { QuickInput }
