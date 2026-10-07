import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import type { AddTaskData , Status} from "@/types/task";
import { Button } from "../ui/button";

type AddTaskFormProps = {
    onAddTask: (data: AddTaskData) => void;
    onCancel: () => void;
    open: boolean;
  };

const CLOSE_MS = 200;

export function AddTaskForm({ onAddTask, onCancel, open }: AddTaskFormProps) {
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!open) {
      if (!hasOpened.current) return;
      let timer = 0;
      const hideFrame = requestAnimationFrame(() => {
        setShown(false);
        timer = window.setTimeout(() => setPresent(false), CLOSE_MS);
      });
      return () => {
        cancelAnimationFrame(hideFrame);
        window.clearTimeout(timer);
      };
    }

    hasOpened.current = true;
    let revealFrame = 0;
    const showFrame = requestAnimationFrame(() => {
      setPresent(true);
      setShown(false);
      revealFrame = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(showFrame);
      cancelAnimationFrame(revealFrame);
    };
  }, [open]);

  if (!present) return null;

  return (
    <AddTaskFields shown={shown} onAddTask={onAddTask} onCancel={onCancel} />
  );
}

function AddTaskFields({
  shown,
  onAddTask,
  onCancel,
}: {
  shown: boolean;
  onAddTask: (data: AddTaskData) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [status, setStatus] = useState<Status>("todo");

  const handleSubmit = () => {
    if (title.trim() === "") return;
    if (description.trim() === "") return;
    if (priority < 0) return;
    if (priority >= 100) return;
  
    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          shown ? "opacity-100" : "opacity-0"
        }`}
        onClick={onCancel}
      />
      <div className="pointer-events-none flex h-full items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-task-title"
          className={`pointer-events-auto flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-y-auto rounded-xl border border-border bg-popover text-popover-foreground shadow-lg transition duration-200 ease-out motion-reduce:transition-none ${
            shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="px-5 pt-5">
            <h2 id="create-task-title" className="text-base font-medium tracking-tight">
              Create new task
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a title, description, priority, and status.
            </p>
          </div>

          <div className="flex flex-col gap-4 px-5 py-5">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Title
              <Input
                type="text"
                placeholder="Task Name"
                value={title}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Description
              <Input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Priority
                <Input
                  type="number"
                  placeholder="Priority"
                  value={priority}
                  onChange={(e) => setPriority(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium">
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Status)}
                  className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" variant="default" size="sm" onClick={handleSubmit}>
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
