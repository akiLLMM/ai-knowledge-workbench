<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits<{
  (e: "submit", payload: any): void
}>()

const title = ref("")
const content = ref("")

/**
 * RAG 相关配置（当前固定，仅展示结构）
 */
const indexEnabled = ref(true)
const chunkSize = ref(500)
const chunkOverlap = ref(100)
const embeddingModel = ref("text-embedding-3-large")

function submit() {
  emit("submit", {
    title: title.value,
    content: content.value,
    indexEnabled: indexEnabled.value,
    chunkSize: chunkSize.value,
    chunkOverlap: chunkOverlap.value,
    embeddingModel: embeddingModel.value
  })

  title.value = ""
  content.value = ""
}

function focusTitle() {
  // 给父组件用
}
defineExpose({ focusTitle })
</script>

<template>
  <div class="editor-wrapper">
    <h3 class="editor-title">
      新增知识（RAG Ingestion）
    </h3>

    <!-- 标题 -->
    <input
      v-model="title"
      class="input"
      placeholder="知识标题，如：Vue 响应式原理"
    >

    <!-- 内容 -->
    <textarea
      v-model="content"
      class="textarea"
      placeholder="输入知识内容，将用于 RAG 检索增强"
      rows="5"
    />

    <!-- RAG 配置（结构展示） -->
    <div class="config">
      <div class="config-item">
        <span class="label">索引启用</span>
        <span class="value">{{ indexEnabled ? "ON" : "OFF" }}</span>
      </div>

      <div class="config-item">
        <span class="label">分块策略</span>
        <span class="value">
          {{ chunkSize }} / overlap {{ chunkOverlap }}
        </span>
      </div>

      <div class="config-item">
        <span class="label">Embedding</span>
        <span class="value">{{ embeddingModel }}</span>
      </div>
    </div>

    <button class="submit-btn" @click="submit">
      保存
    </button>
  </div>
</template>

<style scoped>
.editor-wrapper {
  max-width: 800px;
  margin: 0 auto 20px;
  padding: 14px 16px;
  border: 1px solid #ededed;
  border-radius: 10px;
  background: #fff;
}

.editor-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #222;
}

.input,
.textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e3e3e3;
  margin-bottom: 10px;
  font-size: 14px;
  color: #222;
  background: #fff;
}

.input::placeholder,
.textarea::placeholder {
  color: #b5b5b5;
}

.config {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #666;
}

.config-item .label {
  margin-right: 4px;
  color: #9a9a9a;
}

.config-item .value {
  color: #333;
}

.submit-btn {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid #1a73e8;
  background: #1a73e8;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
}
</style>
