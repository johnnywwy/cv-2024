<script setup lang="ts">
import type { ResumeDocument } from '../../types/resume'
import ProfileHeader from './ProfileHeader.vue'
import EntrySection from './EntrySection.vue'
import ResumeSection from './ResumeSection.vue'
import MarkdownContent from './MarkdownContent.vue'
import ProjectPreview from '../ProjectPreview.vue'
defineProps<{ resume: ResumeDocument }>()
</script>
<template>
  <ProfileHeader :profile="resume.profile" />
  <EntrySection title="教育经历" :entries="resume.education" />
  <EntrySection title="工作经历" :entries="resume.work">
    <template #default="{ item }">
      <ProjectPreview v-for="project in item.projects" :key="project.id" :project="project" />
    </template>
  </EntrySection>
  <ResumeSection v-if="resume.projects.length" title="个人项目">
    <ProjectPreview v-for="project in resume.projects" :key="project.id" :project="project" />
  </ResumeSection>
  <ResumeSection v-if="resume.skills" title="专业技能">
    <MarkdownContent :content="resume.skills" />
  </ResumeSection>
</template>
