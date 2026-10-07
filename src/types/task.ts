

export type Status = "todo" | "doing" | "done"

export type Task = {
  id: number
  title: string
  status: Status
  priority: number
  description: string
}


export type AddTaskData = {
  title: string;
  description: string;
  priority: number;
  status: Status;
};


export type TaskProps = {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, description: string) => void;
  onUpdateDescription: (id: number, description: string) => void;
  onPriorityChange: (id: number, newPriority: number) => void;
};

export type ColumnProps = {
  column: ColumnData;
  onDelete: (id: number) => void;
  onUpdate: (id: number, description: string) => void;
  onUpdateDescription: (id: number, description: string) => void;
  onPriorityChange: (id: number, newPriority: number) => void;

};

export type ColumnData = {
  status: Status;
  title: string;
  tasks: Task[];
};