<script setup lang="ts">
import TaskItem from "./components/TaskItem.vue"
import { useTasks } from "./composables/useTasks"

defineOptions({
  name: "Tasks"
})

const { tasks } = useTasks()
</script>

<template>
  <div class="tasks-page">
    <header class="header">
      <h2 class="title">
        Tasks / Logs
      </h2>
      <p class="desc">
        Tasks 模块用于记录系统中的关键行为与异步任务状态，
        作为 AI 知识工作台的可观测层。
      </p>
    </header>

    <section class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.tasks-page {
  padding: 24px;
}

.header {
  margin-bottom: 18px;
}

.title {
  font-size: 20px;
  margin-bottom: 6px;
  font-weight: 700;
}

.desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
