import { Task } from "@/components/task/Task"
import type { Task as TaskItem } from "@/types/task"

type ColumnProps = {
  title: string
  tasks: TaskItem[]
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <section>
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  )
}
