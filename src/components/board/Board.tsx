import type { Task, ColumnData } from "@/types/task";
import { Column } from "../column/Column";

const task : Task [] = [
  {id: 1, title: "To Do", status: "todo", priority: 10, description: "Learn CRUD"},
  {id: 2, title: "In Progress", status: "doing", priority: 20, description: "Learn TypeScript"},
  {id: 3, title: "Done", status: "done", priority: 30, description: "Learn React"},
  {id: 4, title: "To Do", status: "todo", priority: 40, description: "Learn Next.js"},
  {id: 5, title: "In Progress", status: "doing", priority: 50, description: "Learn Tailwind CSS"},
  {id: 6, title: "Done", status: "done", priority: 60, description: "Learn Shadcn/UI"},
  {id: 7, title: "To Do", status: "todo", priority: 70, description: "Learn Framer Motion"},
  {id: 8, title: "In Progress", status: "doing", priority: 80, description: "Learn React Query"},
  {id: 9, title: "Done", status: "done", priority: 90, description: "Learn React Hook Form"},
  {id: 10, title: "To Do", status: "todo", priority: 100, description: "Learn React Router"},

]


const statuses = ["todo", "doing", "done"] as const;

const columns: ColumnData[] = statuses.map((status) => {
  const taskColumn = task.filter((task) => task.status === status).sort((a, b) => b.priority - a.priority);
  return ({
    status,
    title: status,
    tasks: taskColumn,
  })
})

export function Board () {
  return (
    <div className="flex min-h-screen items-start gap-4 bg-muted/40 p-6">
      {columns.map((column) => (
        <Column key={column.status} column={column} />
      ))}
    </div>
  )
}