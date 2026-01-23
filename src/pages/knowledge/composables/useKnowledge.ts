import type { KnowledgeItem } from "@/pages/knowledge/types"
import { ref } from "vue"

export function useKnowledge() {
  const list = ref<KnowledgeItem[]>([])

  const readyKnowledge = computed(() =>
    list.value.filter(item => item.status === "ready")
  )

  function addKnowledge(title: string) {
    const item: KnowledgeItem = {
      id: Date.now().toString(),
      title,
      type: "text",
      status: "processing",
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
