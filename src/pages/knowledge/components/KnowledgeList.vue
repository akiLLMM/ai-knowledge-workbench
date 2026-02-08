<script setup lang="ts">
import type { KnowledgeItem } from "../types"
import { BookOpen } from "lucide-vue-next"
import { computed } from "vue"
import { useRouter } from "vue-router"

const props = defineProps<{
  list: KnowledgeItem[]
}>()

defineEmits<{
  (e: "create"): void
}>()

const isEmpty = computed(() => props.list.length === 0)

const router = useRouter()

function useInChat(item: KnowledgeItem) {
  if (item.status !== "ready" || !item.indexEnabled) return
  router.push({ path: "/chat", query: { knowledge: item.id } })
}
</script>

<template>
  <div class="list-wrapper">
    <!-- 空状态 + 引导（完整保留） -->
    <div v-if="isEmpty" class="empty-container">
      <div class="empty-icon">
        <BookOpen aria-hidden="true" />
      </div>

      <div class="empty-title">
        暂无知识条目
      </div>

      <div class="empty-desc">
        快速上手：新增知识用于在 Chat 中进行检索增强（RAG）。推荐：
        <ul class="empty-list">
          <li>简洁标题，如：Vue 响应式原理</li>
          <li>内容写清楚上下文：摘要 + 关键点 + 示例</li>
        </ul>
        新增后系统会自动处理（processing → ready），约 2s 后可使用。
      </div>

      <button @click="$emit('create')" class="empty-cta-button">
        新建第一个知识
      </button>
    </div>

    <!-- RAG 资产列表 -->
    <ul v-else class="list">
      <li
        v-for="item in props.list"
        :key="item.id"
        class="list-item"
      >
        <!-- 第一行：标题 + 状态 -->
        <div class="row row-main">
          <span class="title">{{ item.title }}</span>
          <span class="status" :class="item.status">
            {{ item.status.toUpperCase() }}
          </span>
        </div>

        <!-- 第二行：RAG 配置 -->
        <div class="row row-config">
          Index: {{ item.indexEnabled ? "ON" : "OFF" }}
          · Chunk: {{ item.chunk.size }}/{{ item.chunk.overlap }}
          · Emb: {{ item.embeddingModel }}
        </div>

        <!-- 第三行：规模 & 生命周期 -->
        <div class="row row-meta">
          Size: {{ item.size ?? "-" }} chars
          · Updated: {{ item.updatedAt }}
        </div>

        <!-- 操作 -->
        <div class="row row-action">
          <button
            class="use-btn"
            :disabled="item.status !== 'ready' || !item.indexEnabled"
            @click="useInChat(item)"
          >
            使用于 Chat
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* ===== 空状态（轻量化） ===== */
.empty-container {
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  background: #fff;
}

.empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 auto 6px auto;
  border-radius: 999px;
  background: #f1f5f9;
  color: #475569;
}

.empty-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.empty-title {
  font-size: 16px;
  margin-bottom: 6px;
  font-weight: 600;
  color: #0f172a;
}

.empty-desc {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 1.6;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

.empty-list {
  text-align: left;
  display: inline-block;
  margin: 6px 0 10px 0;
  padding-left: 14px;
}

.empty-cta-button {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #334155;
  cursor: pointer;
}

/* ===== 列表 ===== */
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
}

.row {
  font-size: 12px;
  margin-bottom: 4px;
  color: #64748b;
}

.row-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
}

.status {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  color: #64748b;
  background: #fff;
}

.status.ready {
  border-color: #d1fae5;
  color: #047857;
}

.status.processing {
  border-color: #fde68a;
  color: #92400e;
}

.row-action {
  margin-top: 4px;
}

.use-btn {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #334155;
  font-size: 12px;
  cursor: pointer;
}

.use-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #fff;
  color: #94a3b8;
}
</style>
