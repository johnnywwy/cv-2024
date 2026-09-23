<script setup lang="ts">
import { newProject, type Project } from '../../types/resume'
import EntryCollection from './EntryCollection.vue'
import ProjectFields from '../ProjectFields.vue'
const projects = defineModel<Project[]>({ required: true })
defineProps<{ nested?: boolean }>()
</script>
<template>
  <EntryCollection
    v-model="projects"
    :label="nested ? '项目' : '个人项目'"
    :create="newProject"
    :collapsible="nested"
    :add-label="nested ? '添加该公司的项目' : undefined"
  >
    <template #default="{ index }"><ProjectFields v-model="projects[index]" /></template>
  </EntryCollection>
</template>
