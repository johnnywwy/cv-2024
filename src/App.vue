<script setup lang="ts">
import { computed, ref } from 'vue'
import WorkbenchHeader from './components/workbench/WorkbenchHeader.vue'
import WorkbenchNavigation from './components/workbench/WorkbenchNavigation.vue'
import ResumeEditor from './components/ResumeEditor.vue'
import ResumePreview from './components/ResumePreview.vue'
import { useResume } from './composables/useResume'
import { useResumeFiles } from './composables/useResumeFiles'
import TargetingWorkspace from './components/targeting/TargetingWorkspace.vue'
import { projectResume } from './lib/targeting'
const state = useResume()
const { resume, workspace, activeVariant, ready, status, storageBlocked } = state
const { notice, importBackup, handleAction } = useResumeFiles(state)
const previewResume = computed(() => projectResume(activeVariant.value))
function createTarget(company: string, role: string) {
  try {
    state.addTarget(company, role)
  } catch (error) {
    notice.value = (error as Error).message
  }
}
function duplicateTarget() {
  try {
    state.duplicateActive()
  } catch (error) {
    notice.value = (error as Error).message
  }
}
const mobileView = ref<'editor' | 'preview'>('editor')
</script>
<template>
  <WorkbenchHeader :ready="ready" :status="status" @action="handleAction" @import="importBackup" />
  <WorkbenchNavigation
    v-model="mobileView"
    :name="resume.profile.name"
    :status="status"
    :storage-blocked="storageBlocked"
  />
  <div
    v-if="notice"
    role="alert"
    class="no-print mx-5 mb-3 flex items-center justify-between rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700"
  >
    {{ notice }}
    <button aria-label="关闭提示" class="px-2" @click="notice = ''">×</button>
  </div>
  <TargetingWorkspace
    v-if="ready"
    v-model="workspace"
    @create="createTarget"
    @duplicate="duplicateTarget"
    @remove="state.removeActive"
  />
  <main
    v-if="ready"
    class="workbench mx-auto max-w-[1800px] overflow-hidden border-y border-slate-200 lg:h-[calc(100dvh-126px)] lg:grid lg:grid-cols-[minmax(400px,0.85fr)_minmax(0,1.4fr)]"
  >
    <ResumeEditor
      :key="activeVariant.id"
      v-model="resume"
      :class="mobileView === 'editor' ? 'block' : 'hidden lg:block'"
    />
    <ResumePreview
      :resume="previewResume"
      :class="mobileView === 'preview' ? 'block' : 'hidden lg:block'"
    />
  </main>
  <div v-else class="p-20 text-center text-sm text-slate-400">正在打开你的简历…</div>
</template>
