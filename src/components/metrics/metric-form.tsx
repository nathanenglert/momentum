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
import { QuickInput } from "../ui/quick-input"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  value: z.number(),
  dueAt: z.date().optional(),
  tags: z.array(z.string()),
  frequency: z.string().optional(),
})

export interface MetricFormProps {
  dict: any
  possibleTags: string[]
}

export function MetricForm({ dict, possibleTags }: MetricFormProps) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
    },
  })
  const [hasTags, setHasTags] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { toast } = useToast()
  const needsExtendedWidth = dict.submit.label.length > 10

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFetching(true)

    const res = await fetch(`/api/metric`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    setIsFetching(false)

    if (res.status === 201) {
      form.reset()

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
    form.setFocus("value")
  }, [form.setFocus, form.formState.isDirty])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Value</FormLabel>
              <FormControl>
                <QuickInput
                  autoFocus
                  onQuickEnter={form.handleSubmit(onSubmit)}
                  placeholder={dict.title.placeholder}
                  type="number"
                  {...field}
                  {...form.register("value", { valueAsNumber: true })}
                />
              </FormControl>
              <FormDescription className="sr-only">
                {dict.title.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {hasTags && (
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
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            type="button"
            variant={hasTags ? `secondary` : `ghost`}
            onClick={() => setHasTags(!hasTags)}
          >
            Tags
          </Button>
          <Button
            type="submit"
            className={cn({
              "w-[100px]": !needsExtendedWidth,
              "w-[160px]": needsExtendedWidth,
            })}
            disabled={isMutating}
          >
            {dict.submit.label}
          </Button>
        </div>
      </form>
    </Form>
  )
}
