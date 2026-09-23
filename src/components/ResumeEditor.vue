<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ResumeDocument } from '../types/resume'
import { editorSections, type EditorSection } from '../config/editor'
import EditorNavigation from './editor/EditorNavigation.vue'
import ProfileEditor from './editor/ProfileEditor.vue'
import EducationEditor from './editor/EducationEditor.vue'
import WorkEditor from './editor/WorkEditor.vue'
import ProjectsEditor from './editor/ProjectsEditor.vue'
import AppearanceEditor from './editor/AppearanceEditor.vue'
import DescriptionEditor from './editor/DescriptionEditor'
const resume = defineModel<ResumeDocument>({ required: true })
const active = ref<EditorSection>('profile')
const section = computed(() => editorSections.find((section) => section.id === active.value)!)
</script>
<template>
  <aside class="no-print min-w-0 overflow-y-auto border-r border-slate-200 bg-white">
    <EditorNavigation v-model="active" />
    <div class="space-y-5 p-5 sm:p-7">
      <div>
        <h2 class="text-lg font-semibold tracking-tight text-slate-800">{{ section.title }}</h2>
        <p class="mt-1 text-xs leading-6 text-slate-400">{{ section.hint }}</p>
      </div>
      <ProfileEditor v-if="active === 'profile'" v-model="resume.profile" />
      <EducationEditor v-else-if="active === 'education'" v-model="resume.education" />
      <WorkEditor v-else-if="active === 'work'" v-model="resume.work" />
      <ProjectsEditor v-else-if="active === 'projects'" v-model="resume.projects" />
      <DescriptionEditor
        v-else-if="active === 'skills'"
        v-model="resume.skills"
        label="技能与优势"
      />
      <AppearanceEditor v-else-if="active === 'appearance'" v-model="resume.appearance" />
    </div>
  </aside>
</template>
