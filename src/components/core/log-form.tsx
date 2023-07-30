"use client"

import { useEffect, useState, useTransition } from "react"
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

import { Combobox } from "../ui/combobox"
import { DatePicker } from "../ui/date-picker"
import { QuickInput } from "../ui/quick-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  dueAt: z.date().optional(),
  tags: z.array(z.string()),
  frequency: z.string().optional(),
})

export interface LogFormProps {
  type?: "task" | "note" | "meter"
  features?: {
    dueDate?: boolean
    tags?: boolean
    frequency?: boolean
  }
  dict: any
  possibleTags: string[]
}

export function LogForm({ type, features, dict, possibleTags }: LogFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tags: [],
    },
  })
  const [hasDueDate, setHasDueDate] = useState(false)
  const [hasTags, setHasTags] = useState(false)
  const [hasFrequency, setHasFrequency] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { toast } = useToast()
  const needsExtendedWidth = dict.submit.label.length > 10

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFetching(true)

    const res = await fetch(`/api/${type}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    setIsFetching(false)

    if (res.status === 201) {
      form.reset()
      setHasDueDate(false)
      setHasTags(false)
      setHasFrequency(false)

      toast({
        description: dict.submit.toastSuccess,
      })

      startTransition(() => {
        router.refresh()
      })
    } else {
      toast({
        description: dict.submit.toastError,
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (form.formState.isDirty) return
    form.setFocus("title")
  }, [form.setFocus, form.formState.isDirty])

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
                <QuickInput
                  autoFocus
                  onQuickEnter={form.handleSubmit(onSubmit)}
                  placeholder={dict.title.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription className="sr-only">
                {dict.title.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {features?.tags && hasTags && (
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Category</FormLabel>
                <FormControl>
                  <Combobox
                    autoFocus
                    className={`w-full`}
                    placeholder={dict.category.placeholder}
                    selected={field.value as string[]}
                    onChange={field.onChange}
                    items={possibleTags}
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
        {features?.frequency && hasFrequency && (
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
                      autoFocus
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
        {features?.dueDate && hasDueDate && (
          <FormField
            control={form.control}
            name="dueAt"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Due</FormLabel>
                <FormControl>
                  <DatePicker
                    autoFocus
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
        <div className="w-full flex items-center justify-end gap-4">
          {features?.tags && (
            <Button
              type="button"
              variant={hasTags ? `secondary` : `ghost`}
              className="text-accent-foreground"
              onClick={() => setHasTags(!hasTags)}
            >
              Tags
            </Button>
          )}
          {features?.frequency && (
            <Button
              type="button"
              variant={hasFrequency ? `secondary` : `ghost`}
              className="text-accent-foreground"
              onClick={() => setHasFrequency(!hasFrequency)}
            >
              Frequency
            </Button>
          )}
          {features?.dueDate && (
            <Button
              type="button"
              variant={hasDueDate ? `secondary` : `ghost`}
              className="text-accent-foreground"
              onClick={() => setHasDueDate(!hasDueDate)}
            >
              {hasFrequency ? "Start" : "Due"}
            </Button>
          )}
          <Button
            type="submit"
            className={cn(
              "bg-accent-foreground hover:bg-secondary hover:text-accent-foreground",
              {
                "w-[100px]": !needsExtendedWidth,
                "w-[160px]": needsExtendedWidth,
              }
            )}
            disabled={isMutating}
          >
            {dict.submit.label}
          </Button>
        </div>
      </form>
    </Form>
  )
}
