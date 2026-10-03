export type Status = "todo" | "doing" | "done"

export type Task = {
  id: string
  title: string
  status: Status
}

export const columns: { status: Status; title: string }[] = [
  { status: "todo", title: "To Do" },
  { status: "doing", title: "In Progress" },
  { status: "done", title: "Done" },
]
