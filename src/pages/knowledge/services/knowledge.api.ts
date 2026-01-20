import type { KnowledgeItem } from "@/pages/knowledge/types"

export interface CreateKnowledgeDTO {
  title: string
  content: string
  type: "text" | "file"
}

export function fetchKnowledgeList(): Promise<KnowledgeItem[]> {
  // return request.get(...)
  return Promise.resolve([])
}
