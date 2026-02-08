import { ref } from "vue"

export function useMcpTools() {
  const tools = ref([
    {
      id: "search",
      name: "Search Knowledge",
      description: "Search relevant knowledge chunks from vector store",
      enabled: true
    },
    {
      id: "summarize",
      name: "Summarize Content",
      description: "Generate summary from given context",
      enabled: false
    }
  ])

  function toggleTool(id: string) {
    const tool = tools.value.find(t => t.id === id)
    if (tool) tool.enabled = !tool.enabled
  }

  function runTool(id: string) {
    console.log("[MCP] run tool:", id)
  }

  return {
    tools,
    toggleTool,
    runTool
  }
}
