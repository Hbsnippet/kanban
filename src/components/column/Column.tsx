import { Circle, CircleCheck, LoaderCircle } from "lucide-react";
import type {  ColumnProps } from "@/types/task";
import { Task } from "../task/Task";

const stage = {
  todo: { icon: Circle, mark: "bg-zinc-500/15 text-zinc-600" },
  doing: { icon: LoaderCircle, mark: "bg-amber-500/15 text-amber-600" },
  done: { icon: CircleCheck, mark: "bg-emerald-500/15 text-emerald-600" },
} as const;

export function Column( { column, onDelete }: ColumnProps ) { 
  const { icon: Icon, mark } = stage[column.status];

  return (
    <div className="flex min-w-72 flex-1 flex-col rounded-xl bg-muted p-3">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className={`flex size-7 items-center justify-center rounded-lg ${mark}`}>
          <Icon className="size-4" />
        </span>
        <h2 className="text-sm font-medium capitalize">{column.title}</h2>
        <p className="ml-auto text-xs text-muted-foreground">{column.tasks.length} tasks</p>
      </div>
      <div className="flex flex-col gap-2">
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}