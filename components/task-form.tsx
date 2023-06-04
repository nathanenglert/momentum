"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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

import { Combobox } from "./ui/combobox"
import { DatePicker } from "./ui/date-picker"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string(),
  dueDate: z.date(),
  category: z.string(),
})

export function TaskForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Title</FormLabel>
              <FormControl>
                <Input placeholder="What are we crushing?" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                The title of the task you're about to rock!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Why is it important?" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                The deets of that task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Due</FormLabel>
              <FormControl>
                <DatePicker
                  className={`w-full`}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="sr-only">
                When is that thing due?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Category</FormLabel>
              <FormControl>
                <Combobox
                  className={`w-full`}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="sr-only" />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
