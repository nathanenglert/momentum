import { forwardRef, useEffect, useRef } from "react"

import { Input, InputProps } from "./input"

export interface QuickInputProps extends InputProps {
  onQuickEnter: () => void
}

const QuickInput = forwardRef<HTMLInputElement, QuickInputProps>(
  ({ onQuickEnter, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleKeyDown = (event: KeyboardEvent) => {
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
    )
  }
)
QuickInput.displayName = "Quick Input"

export { QuickInput }
