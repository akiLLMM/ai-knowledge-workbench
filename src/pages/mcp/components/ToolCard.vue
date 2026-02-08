<script setup lang="ts">
interface Tool {
  id: string
  name: string
  description: string
  enabled: boolean
}

const props = defineProps<{
  tool: Tool
}>()

const emit = defineEmits<{
  (e: "toggle", id: string): void
  (e: "run", id: string): void
}>()

function onToggle() {
  emit("toggle", props.tool.id)
}

function onRun() {
  emit("run", props.tool.id)
}
</script>

<template>
  <div class="tool-card">
    <!-- Tool 信息 -->
    <div class="tool-info">
      <div class="tool-header">
        <span class="tool-name">{{ tool.name }}</span>
        <span
          class="tool-status"
          :class="{ enabled: tool.enabled }"
        >
          {{ tool.enabled ? "Enabled" : "Disabled" }}
        </span>
      </div>

      <p class="tool-desc">
        {{ tool.description }}
      </p>
    </div>

    <!-- 操作区 -->
    <div class="tool-actions">
      <button
        class="toggle-btn"
        @click="onToggle"
      >
        {{ tool.enabled ? "Disable" : "Enable" }}
      </button>

      <button
        class="run-btn"
        :disabled="!tool.enabled"
        @click="onRun"
      >
        Run
      </button>
    </div>
  </div>
</template>

<style scoped>
.tool-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-info {
  flex: 1;
  margin-right: 16px;
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.tool-name {
  font-weight: 600;
  font-size: 14px;
}

.tool-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #f3f4f6;
  color: #6b7280;
}

.tool-status.enabled {
  background-color: #e0f2fe;
  color: #0369a1;
}

.tool-desc {
  font-size: 13px;
  color: #555;
  line-height: 1.5;
}

.tool-actions {
  display: flex;
  gap: 8px;
}

.toggle-btn,
.run-btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  cursor: pointer;
}

.run-btn {
  background-color: #111827;
  color: #fff;
  border-color: #111827;
}

.run-btn:disabled {
  background-color: #9ca3af;
  border-color: #9ca3af;
  cursor: not-allowed;
}
</style>
