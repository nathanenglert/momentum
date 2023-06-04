import { TaskForm } from "@/components/task-form"

export default function IndexPage() {
  return (
    <section className="container grid gap-6 pb-8 pt-6 md:py-10">
      <div className="w-[420px] mx-auto my-24">
        <TaskForm />
      </div>
    </section>
  )
}
