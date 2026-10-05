
import type { Task } from "@/types/task"



export function Task({ task }: { task: Task }) {
  return (
    <div className="rounded-xl border bg-card px-3.5 py-3 shadow-sm">
      <h2 className="text-sm font-medium leading-snug tracking-tight">{task.description}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{task.title}</p>
      <p className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium tabular-nums text-muted-foreground">{task.priority}</span>
        {task.priority > 50 ? (
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
