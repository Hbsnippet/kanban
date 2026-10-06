import { Circle, CircleCheck, LoaderCircle } from "lucide-react";
import type {  ColumnProps } from "@/types/task";
import { Task } from "../task/Task";

const stage = {
  todo: { icon: Circle, mark: "bg-zinc-500/15 text-zinc-600" },
  doing: { icon: LoaderCircle, mark: "bg-amber-500/15 text-amber-600" },
  done: { icon: CircleCheck, mark: "bg-emerald-500/15 text-emerald-600" },
} as const;

export function Column({ column, onDelete, onUpdate}: ColumnProps) { 
  const { icon: Icon, mark } = stage[column.status];

  return (
    <div className="flex min-w-80 flex-1 flex-col rounded-2xl bg-background/80 p-4 ring-1 ring-border">
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className={`flex size-10 items-center justify-center rounded-xl ${mark}`}>
          <Icon className="size-5" />
        </span>
        <h2 className="text-base font-medium capitalize">{column.title}</h2>
        <p className="ml-auto text-sm text-muted-foreground">{column.tasks.length} tasks</p>
      </div>
      <div className="flex flex-col gap-3">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}