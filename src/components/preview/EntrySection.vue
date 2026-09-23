<script setup lang="ts" generic="T extends Entry">
import type { Entry } from '../../types/resume'
import ResumeSection from './ResumeSection.vue'
import MarkdownContent from './MarkdownContent.vue'
defineProps<{ title: string; entries: T[] }>()
defineSlots<{ default(props: { item: T }): unknown }>()
</script>
<template>
  <ResumeSection v-if="entries.length" :title="title">
    <div v-for="item in entries" :key="item.id" class="resume-entry">
      <div class="entry-heading">
        <h3>{{ item.title }}</h3>
        <time>{{ item.period }}</time>
      </div>
      <p v-if="item.subtitle">{{ item.subtitle }}</p>
      <MarkdownContent :content="item.description" />
      <slot :item="item" />
    </div>
  </ResumeSection>
</template>
