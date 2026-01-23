import type { KnowledgeItem } from "@/pages/knowledge/types"
import { computed, ref } from "vue"

// 【关键修改】将状态定义移到函数外部（单例模式）
// 这样 Knowledge 页面和 Chat 页面共享同一份内存数据
const list = ref<KnowledgeItem[]>([])

export function useKnowledge() {
  const readyKnowledge = computed(() =>
    list.value.filter(item => item.status === "ready")
  )

  function addKnowledge(title: string) {
    const item: KnowledgeItem = {
      id: Date.now().toString(),
      title,
      type: "text",
      status: "processing", // 初始状态
      updatedAt: new Date().toISOString()
    }

    list.value.unshift(item)
    processKnowledge(item.id)
  }

  function processKnowledge(id: string) {
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
    addKnowledge,
    removeKnowledge
  }
}
