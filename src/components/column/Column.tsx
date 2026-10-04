import { Task } from "@/components/task/Task"
import type { Task as TaskItem } from "@/types/task"

type ColumnProps = {
  title: string
  tasks: TaskItem[]
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl bg-muted p-3">
      <header className="flex items-center justify-between px-1">
        <h2 className="text-sm font-medium">{title}</h2>
        <span className="text-xs text-muted-foreground">{tasks.length}</span>
      </header>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </section>
  )
}
