<script setup lang="ts">
import type { Task } from "../types"

defineProps<{
  task: Task
}>()

function formatType(type: Task["type"]) {
  switch (type) {
    case "knowledge_ingest":
      return "知识入库"
    case "chat_session":
      return "对话会话"
    case "mcp_invocation":
      return "MCP 工具调用"
    default:
      return type
  }
}
</script>

<template>
  <div class="task-item">
    <div class="info">
      <div class="title">
        <span class="type">{{ formatType(task.type) }}</span>
        <span class="status" :class="task.status">
          {{ task.status }}
        </span>
      </div>
      <p class="time">
        创建时间：{{ task.createdAt }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px 16px;
}

.title {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 4px;
}

.type {
  font-weight: 600;
}

.status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: capitalize;
}

.status.pending {
  background: #fef3c7;
  color: #92400e;
}

.status.success {
  background: #dcfce7;
  color: #166534;
}

.status.failed {
  background: #fee2e2;
  color: #991b1b;
}

.time {
  font-size: 13px;
  color: #666;
}
</style>
