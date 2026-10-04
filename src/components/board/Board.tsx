import { Column } from "@/components/column/Column"
import { columns, type Task } from "@/types/task"

type BoardProps = {
  tasks: Task[]
}

export function Board({ tasks }: BoardProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Board</h1>
        <p className="mt-1 text-sm text-muted-foreground">{tasks.length} cards</p>
      </header>
      <div className="grid items-start gap-4 md:grid-cols-3">
        {columns.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.status)}
          />
        ))}
      </div>
    </main>
  )
}
