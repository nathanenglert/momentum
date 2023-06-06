"use client"

import * as React from "react"
import { useState } from "react"
import { Float } from "@headlessui-float/react"
import { Combobox as HeadlessCombobox } from "@headlessui/react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./button"

type ComboboxItem = {
  value: string
  label: string
}

export interface ComboBoxProps {
  className?: string
  value: string | undefined
  placeholder: string
  items: ComboboxItem[]
  onChange: (...event: any[]) => void
}

export function Combobox({
  className,
  value,
  placeholder,
  items,
  onChange,
}: ComboBoxProps) {
  const [selectedItems, setSelectedItems] = useState([])

  const removeItem = (itemToRemove: ComboboxItem) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove))
  }

  return (
    <HeadlessCombobox
      value={selectedItems}
      onChange={(value: []) => setSelectedItems(value)}
      multiple
    >
      <Float as="div" className="relative" floatingAs={React.Fragment}>
        <div
          className={cn(
            "flex h-10 gap-2 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          {selectedItems.map((item: ComboboxItem) => (
            <Button
              type="button"
              size={`xs`}
              variant={`secondary`}
              className="gap-2"
              onClick={() => removeItem(item)}
            >
              {item.label} <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          ))}
          <HeadlessCombobox.Input
            className={`flex-grow focus-visible:outline-none`}
            placeholder={placeholder}
          />
        </div>
        <HeadlessCombobox.Options
          className={cn(
            "z-50 w-full mt-1 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          {items.map((item) => (
            <HeadlessCombobox.Option
              key={item.value}
              value={item}
              as={React.Fragment}
            >
              {({
                active,
                selected,
              }: {
                active: boolean
                selected: boolean
              }) => (
                <li
                  className={cn(
                    "relative flex w-full cursor-default items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    active ? "bg-accent text-accent-foreground" : ""
                  )}
                >
                  {selected && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                  {item.label}
                </li>
              )}
            </HeadlessCombobox.Option>
          ))}
        </HeadlessCombobox.Options>
      </Float>
    </HeadlessCombobox>
  )
}
