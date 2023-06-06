"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Combobox } from "../ui/combobox"
import { DatePicker } from "../ui/date-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  category: z.string().optional(),
  frequency: z.string().optional(),
})

export interface TaskFormProps {
  dict: any
}

export function TaskForm({ dict }: TaskFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })
  const [hasDescription, setHasDescription] = useState(false)
  const [hasDueDate, setHasDueDate] = useState(false)
  const [hasCategory, setHasCategory] = useState(false)
  const [hasFrequency, setHasFrequency] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFetching(true)

    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    setIsFetching(false)

    form.reset()

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Title</FormLabel>
              <FormControl>
                <Input placeholder={dict.title.placeholder} {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                {dict.title.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {hasDescription && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={dict.description.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  {dict.description.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {hasFrequency && (
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(!field.value && `text-muted-foreground`)}
                    >
                      <SelectValue placeholder={dict.frequency.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SINGLE">Just Once</SelectItem>
                    <SelectItem value="DAILY">Daily</SelectItem>
                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="sr-only">
                  {dict.frequency.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {hasDueDate && (
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Due</FormLabel>
                <FormControl>
                  <DatePicker
                    className={`w-full`}
                    placeholder={dict.dueDate.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  {dict.dueDate.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {hasCategory && (
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Category</FormLabel>
                <FormControl>
                  <Combobox
                    className={`w-full`}
                    placeholder={dict.category.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    items={[
                      { value: "alpha", label: "Alpha" },
                      { value: "bravo", label: "Bravo" },
                      { value: "charlie", label: "Charlie" },
                    ]}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  {dict.category.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            type="button"
            variant={hasCategory ? `secondary` : `ghost`}
            onClick={() => setHasCategory(!hasCategory)}
          >
            Category
          </Button>
          <Button
            type="button"
            variant={hasDueDate ? `secondary` : `ghost`}
            onClick={() => setHasDueDate(!hasDueDate)}
          >
            Due
          </Button>
          <Button
            type="button"
            variant={hasFrequency ? `secondary` : `ghost`}
            onClick={() => setHasFrequency(!hasFrequency)}
          >
            Frequency
          </Button>
          <Button type="submit" disabled={isMutating}>
            {dict.submit}
          </Button>
        </div>
      </form>
    </Form>
  )
}
