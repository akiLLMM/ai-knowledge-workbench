// pages/knowledge/types.ts

/** 知识来源类型（输入形态） */
export type KnowledgeType = "file" | "text"

/** RAG 处理状态 */
export type KnowledgeStatus = "processing" | "ready"

/** RAG 分块配置 */
export interface ChunkConfig {
  size: number
  overlap: number
}

/** Knowledge 资产（RAG 感知型） */
export interface KnowledgeItem {
  /** 基础标识 */
  id: string
  title: string
  type: KnowledgeType

  /** 内容（当前阶段仍保留在前端） */
  content?: string

  /** 是否参与向量索引 */
  indexEnabled: boolean

  /** 分块策略 */
  chunk: ChunkConfig

  /** Embedding 模型 */
  embeddingModel: string

  /** 系统状态 */
  status: KnowledgeStatus

  /** 规模反馈 */
  size?: number

  /** 生命周期 */
  updatedAt: string
}
