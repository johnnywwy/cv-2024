<script setup lang="ts">
import { editorSections as tabs, type EditorSection } from '../../config/editor'
import AppIcon from '../AppIcon.vue'
const active = defineModel<EditorSection>({ required: true })
</script>
<template>
  <div class="border-b border-slate-100 px-5 py-5 sm:px-7">
    <div
      class="mb-4 flex items-center gap-2 text-[11px] font-semibold tracking-[.2em] text-slate-400"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
      编辑你的简历
    </div>
    <nav class="grid grid-cols-3 gap-1 rounded-xl bg-slate-100/80 p-1" aria-label="简历章节">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="flex items-center justify-center gap-1.5 rounded-lg px-1 py-2.5 text-xs transition"
        :class="
          active === tab.id
            ? 'bg-white font-semibold text-indigo-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-800'
        "
        :aria-pressed="active === tab.id"
        @click="active = tab.id"
      >
        <AppIcon :name="tab.icon" :size="15" />
        {{ tab.title }}
      </button>
    </nav>
  </div>
</template>
