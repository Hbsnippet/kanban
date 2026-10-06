import type { TaskProps } from "@/types/task"
import { Button } from "../ui/button"
import { MinusIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../../components/ui/input"



export function Task({ task, onDelete, onUpdate}: TaskProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

const handleSave = () => {
    if(editedDescription.trim() === "")
      return;
    onUpdate(task.id, editedDescription)
    setIsEditing(false)
  }


  const handleEdit = () => {
    setIsEditing(true);
  }

  return (
    <div
      className={`group rounded-2xl border bg-card p-4 shadow-sm transition-colors ${
        isEditing ? "border-ring ring-3 ring-ring/25" : "hover:border-foreground/15"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <Input
              type="text"
              value={editedDescription}
              autoFocus
              className="h-9 bg-background px-2.5 text-sm font-medium"
              onChange={(e) =>
                setEditedDescription(e.target.value)
              }
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave()
                }
              }}
            />
          ) : (
            <h2 className="flex h-9 items-center text-base font-medium leading-snug tracking-tight">{task.description}</h2>
          )}
          <p className="mt-1 text-sm text-muted-foreground">{task.title}</p>
        </div>
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={handleEdit}
          >
            <PencilIcon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:bg-muted hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </div>
      <p className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Decrease priority"
          >
            <MinusIcon className="size-3.5" />
          </Button>
          <span className="min-w-6 text-center font-medium tabular-nums text-muted-foreground">
            {task.priority}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Increase priority"
          >
            <PlusIcon className="size-3.5" />
          </Button>
        </span>
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
