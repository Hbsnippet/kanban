export type Status = "todo" | "doing" | "done"

export type Task = {
  id: number
  title: string
  status: Status
  priority: number
  description: string
}


export type ColumnData = {
  status: Status;
  title: string;
  tasks: Task[];
};