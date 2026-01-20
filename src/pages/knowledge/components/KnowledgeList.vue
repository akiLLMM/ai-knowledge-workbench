<script setup lang="ts">
import type { KnowledgeItem } from "../types"

defineProps<{
  list: KnowledgeItem[]
}>()
</script>

<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <span>{{ item.title }}</span>
      <span v-if="item.status === 'processing'">⏳ 处理中</span>
      <span v-else>✅ 已完成</span>
    </li>
  </ul>
</template>
