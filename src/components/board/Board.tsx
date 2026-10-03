import { Column } from "@/components/column/Column"
import { columns, type Task } from "@/types/task"

type BoardProps = {
  tasks: Task[]
}

export function Board({ tasks }: BoardProps) {
  return (
    <div>
      {columns.map((column) => (
        <Column
          key={column.status}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.status)}
        />
      ))}
    </div>
  )
}
