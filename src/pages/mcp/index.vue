<script setup lang="ts">
import ToolCard from "./components/ToolCard.vue"
import { useMcpTools } from "./composables/useMcpTools"

defineOptions({
  name: "Knowledge"
})

const { tools, toggleTool, runTool } = useMcpTools()
</script>

<template>
  <div class="mcp-page">
    <!-- 页面标题 -->
    <header class="header">
      <h2 class="title">
        MCP 工具编排
      </h2>
      <p class="desc">
        MCP 模块用于对系统内部的 AI 能力进行工具化抽象与统一编排。
        <br>
        当前以 UI + Mock 的形式呈现，用于验证工具建模与编排设计，而非实现完整 MCP 协议。
      </p>
    </header>

    <!-- Tool 列表 -->
    <section class="tool-list">
      <ToolCard
        v-for="tool in tools"
        :key="tool.id"
        :tool="tool"
        @toggle="toggleTool"
        @run="runTool"
      />
    </section>

    <!-- 设计说明（建议保留，面试非常好讲） -->
    <section class="note">
      <h3 class="note-title">
        设计说明
      </h3>
      <ul class="note-list">
        <li>
          MCP 页面关注的是 <b>工具能力的抽象</b> 与 <b>编排意图的表达</b>，
          而非直接实现 MCP 协议或真实工具调用。
        </li>
        <li>
          实际的工具执行逻辑应由后端或 Agent 层通过 Adapter 接入完成。
        </li>
        <li>
          当前页面职责仅包括：工具列表展示、启用状态管理以及执行意图触发。
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.mcp-page {
  padding: 24px;
}

.header {
  margin-bottom: 18px;
}

.title {
  font-size: 20px;
  margin: 0 0 8px;
  font-weight: 700;
}

.desc {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.tool-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 18px;
}

/* 设计说明 */
.note {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px 16px;
  background: #fafafa;
}

.note-title {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
}

.note-list {
  margin: 0;
  padding-left: 18px;
  color: #555;
  font-size: 13px;
  line-height: 1.7;
}
</style>
