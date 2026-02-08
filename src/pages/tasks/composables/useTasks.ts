import type { Task } from "../types"
import { ref } from "vue"

export function useTasks() {
  const tasks = ref<Task[]>([
    {
      id: "task-1",
      type: "knowledge_ingest",
      status: "success",
      createdAt: "2024-02-10 14:20"
    },
    {
      id: "task-2",
      type: "chat_session",
      status: "pending",
      createdAt: "2024-02-10 14:35"
    },
    {
      id: "task-3",
      type: "mcp_invocation",
      status: "failed",
      createdAt: "2024-02-10 14:50"
    }
  ])

  return {
    tasks
  }
}
