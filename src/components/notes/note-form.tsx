"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
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

import { Combobox } from "../ui/combobox"
import { QuickInput } from "../ui/quick-input"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  tags: z.array(z.string()),
})

export function NoteForm({
  dict,
  possibleTags,
}: {
  dict: any
  possibleTags: string[]
}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tags: [],
    },
  })
  const [hasTags, setHasTags] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isMutating = isFetching || isPending
  const { toast } = useToast()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsFetching(true)

    const res = await fetch("/api/note", {
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
    form.setFocus("title")
  }, [form.setFocus])

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
          <Button type="submit" className="w-[100px]" disabled={isMutating}>
            {dict.submit.label}
          </Button>
        </div>
      </form>
    </Form>
  )
}
