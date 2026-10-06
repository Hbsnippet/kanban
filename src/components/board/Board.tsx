import type { Task, ColumnData } from "@/types/task";
import { Column } from "../column/Column";
import {useState} from "react";
import { Button } from "../ui/button";


const initialTask : Task [] = [
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

export function Board () {


const [tasks, setTasks] = useState(initialTask);

const deleteTask = (id: number) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

const updateTask = (id: number, description: string) => {
  setTasks((current) => current.map((task) => task.id === id ? { ...task, description } : task))
};



const columns: ColumnData[] = statuses.map((status) => {
  const taskColumn = tasks.filter((task) => task.status === status).sort((a, b) => b.priority - a.priority);
  return ({
    status,
    title: status,
    tasks: taskColumn,
  })
})

  return (
    <div className="flex min-h-screen flex-col bg-muted/50 p-8">
      <div className="mb-5 flex justify-end">
        <Button
          type="button"
          variant="default"
          size="sm"
        >
          Add Task
        </Button>
      </div>
      <div className="flex items-start gap-5">
        {columns.map((column) => (
          <Column key={column.status} column={column} onDelete={deleteTask} onUpdate={updateTask} />
        ))}
      </div>
    </div>
  )
}