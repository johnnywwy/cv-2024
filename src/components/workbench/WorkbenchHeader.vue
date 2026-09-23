<script setup lang="ts">
import AppIcon from '../AppIcon.vue'
import ResumeFileMenu from './ResumeFileMenu.vue'
import type { ResumeFileAction } from '../../composables/useResumeFiles'
defineProps<{ ready: boolean; status: string }>()
defineEmits<{ action: [action: ResumeFileAction]; import: [file: File] }>()
</script>
<template>
  <header class="no-print sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div
      class="mx-auto flex min-h-19 max-w-[1800px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-7"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm"
        >
          <AppIcon name="document" :size="22" />
        </div>
        <div>
          <div class="flex items-baseline gap-2">
            <h1 class="text-base font-bold tracking-wide text-slate-800">简历工坊</h1>
            <span class="hidden text-[10px] font-medium tracking-widest text-slate-400 sm:inline">
              RESUME STUDIO
            </span>
          </div>
          <p class="mt-0.5 text-[11px] text-slate-400">把你的经历，变成下一个机会。</p>
        </div>
      </div>
      <div class="flex items-center gap-2 sm:gap-3">
        <div
          class="mr-2 hidden max-w-64 items-center gap-1.5 text-[11px] text-slate-400 xl:flex"
          role="status"
        >
          <AppIcon name="check" :size="14" />
          {{ status }}
        </div>
        <ResumeFileMenu
          :ready="ready"
          @action="$emit('action', $event)"
          @import="$emit('import', $event)"
        />
        <button class="btn-primary" :disabled="!ready" @click="$emit('action', 'print')">
          <AppIcon name="download" :size="16" />
          <span>导出 PDF</span>
        </button>
      </div>
    </div>
  </header>
</template>
