import type { TaskProps } from "@/types/task"
import { Button } from "../ui/button"
import { TrashIcon } from "lucide-react";



export function Task({ task , onDelete }: TaskProps) {
  return (
    <div className="relative rounded-xl border bg-card px-3.5 py-3 shadow-sm">
      <Button
        variant="ghost"
        size="icon-xs"
        className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
       onClick={() => onDelete(task.id)}>
        <TrashIcon />
      </Button>
      <h2 className="pr-7 text-sm font-medium leading-snug tracking-tight">{task.description}</h2>
      <p className="mt-1 pr-7 text-xs text-muted-foreground">{task.title}</p>
      <p className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium tabular-nums text-muted-foreground">{task.priority}</span>
        {task.priority > 60 ? (
          <span className="rounded-full bg-red-500/10 px-2 py-0.5 font-medium text-red-600">High</span>
        ) : task.priority > 30 ? (
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-700">
            Medium
          </span>
        ) : (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-700">
            Low
          </span>
        )}
      </p>
    </div>
  );
}
