<script setup lang="ts">
import type { Project } from '../types/resume'
import { projectFields } from '../config/editor'
import FieldGroup from './editor/FieldGroup.vue'
import DescriptionEditor from './editor/DescriptionEditor'
const project = defineModel<Project>({ required: true })
</script>
<template>
  <div class="space-y-4">
    <FieldGroup v-model="project" :fields="projectFields" />
    <DescriptionEditor v-model="project.description" label="项目描述与成果" />
  </div>
</template>
