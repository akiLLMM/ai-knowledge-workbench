<script setup lang="ts">
import { ref } from "vue"

const emit = defineEmits<{
  (e: "submit", title: string): void
}>()

const title = ref("")
const content = ref("")

function onSubmit() {
  if (!title.value.trim()) return

  emit("submit", title.value)

  title.value = ""
  content.value = ""
}
</script>

<template>
  <div>
    <input v-model="title" placeholder="知识标题">
    <textarea v-model="content" placeholder="知识内容" />
    <button @click="onSubmit">
      新增
    </button>
  </div>
</template>
