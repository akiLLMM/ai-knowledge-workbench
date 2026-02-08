import type { KnowledgeItem, KnowledgeType } from "@/pages/knowledge/types"
import { computed, ref, watch } from "vue"

const STORAGE_KEY = "ai-workbench-knowledge-list"

/**
 * 从 localStorage 初始化
 */
function loadFromStorage(): KnowledgeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * 单例知识列表（RAG 资产）
 */
const list = ref<KnowledgeItem[]>(loadFromStorage())

/**
 * 自动持久化
 */
watch(
  list,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true }
)

export function useKnowledge() {
  /**
   * 仅可用于 Chat 的知识（已完成 RAG 处理）
   */
  const readyKnowledge = computed(() =>
    list.value.filter(item => item.status === "ready" && item.indexEnabled)
  )

  /**
   * 当前阶段不从 service 拉数据
   * localStorage 即为数据源
   */
  async function loadList() {
    // no-op：保持接口，方便未来接后端
  }

  /**
   * 新增知识（模拟 RAG ingestion）
   */
  function addKnowledge(payload: {
    title: string
    content: string
    indexEnabled: boolean
    chunkSize: number
    chunkOverlap: number
    embeddingModel: string
    type?: KnowledgeType
  }) {
    const now = new Date().toISOString()

    const item: KnowledgeItem = {
      id: Date.now().toString(),
      title: payload.title,
      type: payload.type ?? "text",

      // 内容
      content: payload.content,

      // RAG 配置
      indexEnabled: payload.indexEnabled,
      chunk: {
        size: payload.chunkSize,
        overlap: payload.chunkOverlap
      },
      embeddingModel: payload.embeddingModel,

      // 系统状态
      status: "processing",
      size: payload.content.length,
      updatedAt: now
    }

    list.value.unshift(item)

    simulateProcessing(item.id)
  }

  /**
   * 模拟 RAG 处理完成（状态变化）
   */
  function simulateProcessing(id: string) {
    setTimeout(() => {
      const target = list.value.find(item => item.id === id)
      if (!target) return

      target.status = "ready"
      target.updatedAt = new Date().toISOString()
    }, 2000)
  }

  function removeKnowledge(id: string) {
    list.value = list.value.filter(item => item.id !== id)
  }

  return {
    list,
    readyKnowledge,
    loadList,
    addKnowledge,
    removeKnowledge
  }
}
