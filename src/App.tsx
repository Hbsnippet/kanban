import { Board } from "@/components/board/Board"
import type { Task } from "@/types/task"

const tasks: Task[] = [
  { id: "1", title: "Write the card data", status: "todo" },
  { id: "2", title: "Group cards by status", status: "doing" },
  { id: "3", title: "Show one card", status: "done" },
]

function App() {
  return <Board tasks={tasks} />
}

export default App
