export type ChatRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: string
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: string
}

export interface ChatContext {
  question: string
  knowledge: {
    id: string
    title: string
  }[]
}
