import type { Task as TypeTask, ColumnData, AddTaskData , Status} from "@/types/task";
import { Column } from "../column/Column";
import {useState, useEffect} from "react";
import { Button } from "../ui/button";
import { AddTaskForm } from "../add-task/addTask";
import { DragDropProvider } from "@dnd-kit/react";



const initialTask : TypeTask [] = [
  {id: 1, title: "Learn CRUD", status: "todo", priority: 10, description: "Learn CRUD and make projects"},
  {id: 2, title: "Learn TypeScript", status: "doing", priority: 20, description: "Learn TypeScript and make project using it"},
  {id: 3, title: "Learn React", status: "done", priority: 30, description: "Learn React and make project using it"},
  {id: 4, title: "Learn Next.js", status: "todo", priority: 40, description: "Learn Next.js and make project using it"},
  {id: 5, title: "Learn Tailwind CSS", status: "doing", priority: 50, description: "Learn Tailwind CSS and make project using it"},
  {id: 6, title: "Learn Shadcn/UI", status: "done", priority: 60, description: "Learn Shadcn/UI and make project using it"},
  {id: 7, title: "Learn Framer Motion", status: "todo", priority: 70, description: "Learn Framer Motion and make project using it"},
  {id: 8, title: "Learn React Query", status: "doing", priority: 80, description: "Learn React Query and make project using it"},
  {id: 9, title: "Learn React Hook Form", status: "done", priority: 90, description: "Learn React Hook Form and make project using it"},
  {id: 10, title: "Learn React Router", status: "todo", priority: 100, description: "Learn React Router and make project using it"},

]





const statuses = ["todo", "doing", "done"] as const;

export function Board () {
 



const [isAdding, setIsAdding] = useState(false);


const [tasks, setTasks] = useState<TypeTask[]>(() =>  {
    const saved = localStorage.getItem("Task")

if (saved !== null) {
  return JSON.parse(saved)
} else {
  return initialTask;
}
})

const deleteTask = (id: number) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

const updateTask = (id: number, title: string) => {
  setTasks((current) => current.map((task) => task.id === id ? { ...task, title } : task))
};

// Same update as the title: find this task and replace one field.
// Description gets its own function so a description save cannot overwrite the title.
const updateDescription = (id: number, description: string) => {
  setTasks((current) => current.map((task) => task.id === id ? { ...task, description } : task))
};

const handleAddTask = (data: AddTaskData) => {
  setTasks((current) => [...current, { ...data, id: current.length + 1 }]);
  setIsAdding(false);
};


const updatePriority = (id: number, newPriority: number) => {
  setTasks((current) => current.map((task) => task.id === id ? {...task, priority: newPriority} : task))
}

const updateStatus = (id: number, newStatus: Status) => {
  setTasks((current) => current.map((task) => task.id === id? {...task, status: newStatus}: task))
}

useEffect ( () => {
  localStorage.setItem("Task", JSON.stringify(tasks))
}, [tasks])


const columns: ColumnData[] = statuses.map((status) => {
  const taskColumn = tasks.filter((task) => task.status === status).sort((a, b) => b.priority - a.priority);
  return ({
    status,
    title: status,
    tasks: taskColumn,
  })
})

  return (
    <DragDropProvider onDragEnd={(event) => {
      const {source, target} = event.operation;
      if (source && target) {
        const sourceId = Number(source.id);
        const targetStatus = target.id as Status;
        updateStatus(sourceId, targetStatus);
      }
    }}>
    <div className="flex min-h-screen flex-col bg-muted/50 p-8">
      <div className="mb-5 flex justify-end">
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() => setIsAdding(true)}
        >
          Add Task
        </Button>
      </div>


      <AddTaskForm
        open={isAdding}
        onAddTask={handleAddTask}
        onCancel={() => setIsAdding(false)}
      />



      <div className="flex items-start gap-5">
        {columns.map((column) => (
          <Column key={column.status} column={column} onDelete={deleteTask} onUpdate={updateTask} onUpdateDescription={updateDescription} onPriorityChange={updatePriority} />
        ))}
      </div>
    </div>
    </DragDropProvider>
  )
}