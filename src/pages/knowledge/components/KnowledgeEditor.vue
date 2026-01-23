<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits<{
  (e: "submit", title: string): void
}>()

const title = ref("")
const content = ref("")

// 新增：用于聚焦输入框
const titleInput = ref<HTMLInputElement | null>(null)

function onSubmit() {
  if (!title.value.trim()) return

  emit("submit", title.value)

  title.value = ""
  content.value = ""
}

// 暴露一个方法给父组件调用（index.vue 点击“新增知识”时聚焦）
defineExpose({
  focusTitle() {
    titleInput.value?.focus()
  }
})
</script>

<template>
  <div class="editor">
    <input ref="titleInput" v-model="title" placeholder="知识标题" class="editor-input">
    <textarea v-model="content" placeholder="知识内容" class="editor-textarea" />
    <button @click="onSubmit" class="editor-btn">
      新增
    </button>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 720px;
}
.editor-input {
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
}
.editor-textarea {
  min-height: 80px;
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
}
.editor-btn {
  align-self: flex-start;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #1677ff;
  background: #1677ff;
  color: #fff;
  cursor: pointer;
}
.editor-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
