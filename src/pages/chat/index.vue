<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useKnowledge } from "../knowledge/composables/useKnowledge"
import { useChat } from "./composables/useChat"

// 1 读取 Knowledge（只读视图）
const { readyKnowledge } = useKnowledge()

// 2 页面级 UI 状态
const selectedKnowledgeIds = ref<string[]>([])
const question = ref("")

// 3 Chat 引擎（通过依赖注入消费 knowledge）
const { session, createSession, ask, isThinking } = useChat(readyKnowledge)

onMounted(() => {
  createSession()
})

function onAsk() {
  if (!question.value.trim()) return

  ask(question.value, selectedKnowledgeIds.value)
  question.value = ""
}
</script>

<template>
  <div class="chat-page">
    <h2>Chat</h2>

    <!-- 知识选择区 -->
    <section>
      <h3>可用知识</h3>

      <ul>
        <li
          v-for="item in readyKnowledge"
          :key="item.id"
        >
          <label>
            <input
              type="checkbox"
              :value="item.id"
              v-model="selectedKnowledgeIds"
            >
            {{ item.title }}
          </label>
        </li>
      </ul>
    </section>

    <!-- 对话区 -->
    <section v-if="session">
      <h3>对话</h3>

      <div
        v-for="msg in session.messages"
        :key="msg.id"
        style="margin-bottom: 8px"
      >
        <strong>{{ msg.role }}：</strong>
        <pre style="display: inline">{{ msg.content }}</pre>
      </div>
      <div
        v-if="isThinking"
        style="margin-top: 8px; color: #888"
      >
        🤖 正在思考中，请稍候…
      </div>
    </section>

    <!-- 输入区 -->
    <section>
      <textarea
        v-model="question"
        placeholder="请输入你的问题"
        :disabled="isThinking"
      />

      <button
        @click="onAsk"
        :disabled="isThinking"
      >
        提问
      </button>
    </section>
  </div>
</template>
