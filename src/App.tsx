import { Board } from "@/components/board/Board"
import type { Task } from "@/types/task"

const tasks: Task[] = []

function App() {
  return <Board tasks={tasks} />
}

export default App
