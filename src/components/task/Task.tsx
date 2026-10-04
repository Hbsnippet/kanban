import type { Task as TaskItem } from "@/types/task"

type TaskProps = {
  task: TaskItem
}



export function Task({ task }: TaskProps) {
  return (
    <article className="rounded-lg border bg-card px-3 py-2.5 text-sm">
      {task.title}
    </article>
  )
}
