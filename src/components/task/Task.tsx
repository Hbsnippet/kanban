import type { TaskProps } from "@/types/task"
import { Button } from "../ui/button"
import { MinusIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useRef, useState, type FocusEvent } from "react";
import { Input } from "../../components/ui/input"



export function Task({ task, onDelete, onUpdate, onUpdateDescription, onPriorityChange}: TaskProps) {

  const [isEditing, setIsEditing] = useState(false);
  // Drafts live here, not on the board. Typing updates this card only.
  // The board changes when a save handler sends the value upward.
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const fieldsRef = useRef<HTMLDivElement>(null);

  // Reject a blank title, then hand the draft to the board.
  // onUpdate replaces the title for this id and leaves every other field alone.
  const handleSave = () => {
    if(editedTitle.trim() === "")
      return false;
    onUpdate(task.id, editedTitle)
    return true;
  }

  // Same steps as the title: ignore an empty draft, then save through a callback.
  // This cannot call onUpdate, because that callback writes the title.
  const handleSaveDescription = () => {
    if(editedDescription.trim() === "")
      return false;
    onUpdateDescription(task.id, editedDescription)
    return true;
  }

  // Both fields share one edit mode, opened by the pencil.
  // Closing on the title's blur would unmount the description input
  // before it can be edited, so leave edit mode only after focus exits both fields.
  const focusStaysInFields = (event: FocusEvent<HTMLInputElement>) => {
    const next = event.relatedTarget;
    return next instanceof Node && (fieldsRef.current?.contains(next) ?? false);
  }

  const finishEditing = (event: FocusEvent<HTMLInputElement>) => {
    if (focusStaysInFields(event)) return;
    if (handleSave() && handleSaveDescription()) {
      setIsEditing(false)
    }
  }

  // Enter commits the same way blur does, but it does not move focus,
  // so call the save handlers directly instead of pretending a blur happened.
  const commitBoth = () => {
    if (handleSave() && handleSaveDescription()) {
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setIsEditing(true);
  }


  const handlePlus = () => {
    onPriorityChange(task.id, task.priority + 1)
  }
  

  const handleMinus = () => {
    onPriorityChange(task.id, task.priority - 1)
  }

  return (
    <div
      className={`group rounded-2xl border bg-card p-4 shadow-sm transition-colors ${
        isEditing ? "border-ring ring-3 ring-ring/25" : "hover:border-foreground/15"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div ref={fieldsRef} className="min-w-0 flex-1">
          {isEditing ? (
            <Input
              type="text"
              value={editedTitle}
              autoFocus
              className="h-9 bg-background px-2.5 text-sm font-medium"
              onChange={(e) =>
                setEditedTitle(e.target.value)
              }
              onBlur={finishEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitBoth()
                }
              }}
            />
          ) : (
            <h2 className="flex h-9 items-center text-base font-medium leading-snug tracking-tight">{task.title}</h2>
          )}
          {isEditing ? (
            <Input
              type="text"
              value={editedDescription}
              className="mt-1 h-9 bg-background px-2.5 text-sm"
              onChange={(e) =>
                setEditedDescription(e.target.value)
              }
              onBlur={finishEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  commitBoth()
                }
              }}
            />
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{task.description}</p>
          )}
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
            onClick={() => {if (task.priority > 0 )handleMinus()}}
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
            onClick={() => {if (task.priority < 100)handlePlus()}}
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
