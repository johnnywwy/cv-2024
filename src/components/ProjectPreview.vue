<script setup lang="ts">
import type { Project } from '../types/resume'
import { safeUrl } from '../lib/markdown'
import MarkdownContent from './preview/MarkdownContent.vue'
defineProps<{ project: Project }>()
</script>
<template>
  <div class="project-block">
    <div class="entry-heading">
      <h4 class="project-heading">{{ project.title }}</h4>
      <a
        v-if="safeUrl(project.url)"
        :href="safeUrl(project.url)"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[.85em]"
      >
        项目链接 ↗
      </a>
    </div>
    <p v-if="project.subtitle || project.period" class="text-[.9em] text-slate-500">
      {{ [project.subtitle, project.period].filter(Boolean).join(' · ') }}
    </p>
    <div v-if="project.tags" class="tags">
      <span
        v-for="(tag, index) in project.tags
          .split(/[,，]/)
          .map((t) => t.trim())
          .filter(Boolean)"
        :key="index"
      >
        {{ tag }}
      </span>
    </div>
    <MarkdownContent :content="project.description" />
  </div>
</template>
