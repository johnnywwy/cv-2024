<script setup lang="ts">
import { newJob, type Job } from '../../types/resume'
import { workFields } from '../../config/editor'
import EntryCollection from './EntryCollection.vue'
import FieldGroup from './FieldGroup.vue'
import DescriptionEditor from './DescriptionEditor'
import ProjectsEditor from './ProjectsEditor.vue'
const jobs = defineModel<Job[]>({ required: true })
</script>
<template>
  <EntryCollection v-model="jobs" label="工作经历" :create="newJob">
    <template #default="{ item, index }">
      <FieldGroup v-model="jobs[index]" :fields="workFields" />
      <DescriptionEditor v-model="item.description" label="工作概述（选填）" />
      <ProjectsEditor v-model="item.projects" nested />
    </template>
  </EntryCollection>
</template>
