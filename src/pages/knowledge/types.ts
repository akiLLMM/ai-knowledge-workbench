// pages/knowledge/types.ts

export type KnowledgeType = "file" | "text"
export type KnowledgeStatus = "processing" | "ready"

export interface KnowledgeItem {
  id: string
  title: string
  type: KnowledgeType
  status: KnowledgeStatus
  updatedAt: string
}
