<script setup lang="ts">
import KnowledgeEditor from "./components/KnowledgeEditor.vue"
import KnowledgeList from "./components/KnowledgeList.vue"
import { useKnowledge } from "./composables/useKnowledge"

const { list, addKnowledge } = useKnowledge()
</script>

<template>
  <div class="knowledge-page">
    <KnowledgeEditor @submit="addKnowledge" />
    <KnowledgeList :list="list" />
  </div>
</template>
