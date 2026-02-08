export type TaskStatus = "pending" | "success" | "failed"

export type TaskType
  = | "knowledge_ingest"
    | "chat_session"
    | "mcp_invocation"

export interface Task {
  id: string
  type: TaskType
  status: TaskStatus
  createdAt: string
}
