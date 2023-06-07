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
  const [selectedItems, setSelectedItems] = useState<ComboboxItem[]>([])
  const [query, setQuery] = useState("")

  const lowercasedQuery = query.toLowerCase()
  const isNotSelected = (item: ComboboxItem) => !selectedItems.includes(item)
  const matchesQuery = (item: ComboboxItem) =>
    item.label.toLowerCase().includes(lowercasedQuery)

  const filteredItems = items.filter(
    (item) => isNotSelected(item) && (query === "" || matchesQuery(item))
  )

  const handleQueryKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (query !== "" || evt.key !== "Backspace") return
    setSelectedItems(selectedItems.slice(0, -1))
  }

  const removeItem = (itemToRemove: ComboboxItem) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove))
  }

  return (
    <HeadlessCombobox
      value={selectedItems}
      onChange={(value: []) => {
        setSelectedItems(value)
        setQuery("")
      }}
      multiple
    >
      <Float as="div" className="relative" floatingAs={React.Fragment}>
        <div
          className={cn(
            "flex h-10 gap-2 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
            className
          )}
        >
          {selectedItems.map((item: ComboboxItem) => (
            <Button
              type="button"
              key={item.label}
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
            value={query}
            onKeyDown={handleQueryKeyDown}
            onChange={(evt) => setQuery(evt.target.value)}
          />
        </div>
        <HeadlessCombobox.Options
          className={cn(
            "z-50 w-full mt-1 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          {filteredItems.map((item) => (
            <HeadlessCombobox.Option
              key={item.value}
              value={item}
              as={React.Fragment}
            >
              {({ active }: { active: boolean }) => (
                <li
                  className={cn(
                    "relative flex w-full cursor-default items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    active ? "bg-accent text-accent-foreground" : ""
                  )}
                >
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
