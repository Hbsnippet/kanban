import type { Task as TaskItem } from "@/types/task"

type TaskProps = {
  task: TaskItem
}

export function Task({ task }: TaskProps) {
  return <article>{task.title}</article>
}
