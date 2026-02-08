<script setup lang="ts">
import { onMounted, ref } from "vue"
import KnowledgeEditor from "./components/KnowledgeEditor.vue"
import KnowledgeList from "./components/KnowledgeList.vue"
import { useKnowledge } from "./composables/useKnowledge"

defineOptions({
  name: "Knowledge"
})

const { list, addKnowledge, loadList } = useKnowledge()
// 引用编辑器组件以便从列表的“新增”按钮触发聚焦编辑器
const editorRef = ref<any>(null)

// 被 KnowledgeList 的 create 事件调用，聚焦标题输入
function onCreate() {
  editorRef.value?.focusTitle?.()
}

onMounted(() => {
  loadList()
})
</script>

<template>
  <div class="knowledge-page">
    <div class="knowledge-layout">
      <section class="knowledge-card">
        <KnowledgeEditor ref="editorRef" @submit="addKnowledge" />
      </section>
      <section class="knowledge-card">
        <KnowledgeList :list="list" @create="onCreate" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.knowledge-page {
  padding: 12px 16px 4px;
  color: #0f172a;
}
.knowledge-layout {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: 100%;
}
.knowledge-card {
  width: min(100%, 980px);
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
  padding: 16px;
}
</style>
