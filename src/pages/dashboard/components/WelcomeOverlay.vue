<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"

const props = defineProps<{
  targets: {
    knowledge: string
    chat: string
  }
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()

const step = ref<1 | 2>(1)

const visible = ref(false)

let highlightedEl: HTMLElement | null = null

const hintStyle = ref<Record<string, string>>({})

function updateHintPosition(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const offset = 12
  const hintHeight = 140
  const top = Math.max(12, rect.top - hintHeight - offset)
  const left = Math.min(window.innerWidth - 360, rect.left)
  hintStyle.value = {
    position: "fixed",
    top: `${top}px`,
    left: `${left}px`
  }
}

function highlight(selector: string) {
  removeHighlight()
  const el = document.querySelector(selector) as HTMLElement | null
  if (el) {
    el.classList.add("welcome-highlight")
    highlightedEl = el
    updateHintPosition(el)
  }
}

function removeHighlight() {
  if (highlightedEl) {
    highlightedEl.classList.remove("welcome-highlight")
    highlightedEl = null
  }
}

function next() {
  if (step.value === 1) {
    step.value = 2
  } else {
    close()
  }
}

function close() {
  removeHighlight()
  visible.value = false
  emit("close")
}

watch(step, (val) => {
  if (val === 1) {
    highlight(props.targets.knowledge)
  } else {
    highlight(props.targets.chat)
  }
})

onMounted(async () => {
  highlight(props.targets.knowledge)
  window.addEventListener("resize", handleResize)
  await nextTick()
  visible.value = true
})

onBeforeUnmount(() => {
  removeHighlight()
  window.removeEventListener("resize", handleResize)
})

function handleResize() {
  if (highlightedEl) updateHintPosition(highlightedEl)
}
</script>

<template>
  <div class="welcome-overlay" @click.self="close">
    <transition name="fade" appear>
      <div v-if="visible" class="welcome-hint" :style="hintStyle">
        <p class="hint-text">
          <template v-if="step === 1">
            Ingest and structure your knowledge
          </template>
          <template v-else>
            Query with AI via retrieval-augmented context
          </template>
        </p>

        <div class="hint-actions">
          <button class="btn-skip" @click="close">
            Skip
          </button>
          <button class="btn-next" @click="next">
            {{ step === 1 ? 'Next' : 'Got it' }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.welcome-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
}

/* 引导文案容器 */
.welcome-hint {
  background: white;
  padding: 20px 24px;
  border-radius: 12px;
  max-width: 320px;
  text-align: left;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* 文案 */
.hint-text {
  font-size: 14px;
  color: #303133;
  margin-bottom: 16px;
}

/* 按钮区 */
.hint-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.btn-skip {
  background: transparent;
  border: none;
  color: #909399;
  cursor: pointer;
}

.btn-next {
  background: var(--el-color-primary);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

<!-- 全局样式（不要 scoped） -->
<style>
.welcome-highlight {
  position: relative;
  z-index: 1001;
  box-shadow:
    0 0 0 2px var(--el-color-primary),
    0 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}
</style>
