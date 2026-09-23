<script setup lang="ts">
import { computed } from 'vue'
import { renderMarkdown } from '../../lib/markdown'
const props = defineProps<{ content: string }>()
const html = computed(() => renderMarkdown(props.content))
</script>
<template><div v-if="content" class="markdown-body" v-html="html"></div></template>
