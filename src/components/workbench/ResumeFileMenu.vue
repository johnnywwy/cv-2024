<script setup lang="ts">
import { ref } from 'vue'
import type { ResumeFileAction } from '../../composables/useResumeFiles'
defineProps<{ ready: boolean }>()
const emit = defineEmits<{ action: [action: ResumeFileAction]; import: [file: File] }>()
const open = ref(false)
const input = ref<HTMLInputElement>()
const actions: { id: ResumeFileAction | 'import'; label: string }[] = [
  { id: 'backup', label: '导出完整版本库' },
  { id: 'current-backup', label: '导出当前简历 JSON' },
  { id: 'import', label: '导入 JSON 备份' },
  { id: 'markdown', label: '导出 Markdown' },
  { id: 'reset', label: '恢复当前版本内容' },
]
function select(action: ResumeFileAction | 'import') {
  open.value = false
  if (action === 'import') input.value?.click()
  else emit('action', action)
}
function importFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) emit('import', file)
  target.value = ''
}
</script>
<template>
  <div class="relative" @keydown.esc="open = false">
    <button class="btn" :disabled="!ready" :aria-expanded="open" @click="open = !open">
      文件
      <span class="ml-1 text-slate-400">⌄</span>
    </button>
    <div
      v-if="open"
      class="absolute right-0 top-full z-40 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
    >
      <button
        v-for="action in actions"
        :key="action.id"
        class="block w-full rounded-lg px-3 py-2.5 text-left text-xs"
        :class="
          action.id === 'reset'
            ? 'mt-1 border-t border-slate-100 text-red-500 hover:bg-red-50'
            : 'hover:bg-slate-50'
        "
        @click="select(action.id)"
      >
        {{ action.label }}
      </button>
    </div>
    <input
      ref="input"
      type="file"
      accept="application/json,.json"
      class="hidden"
      aria-label="导入 JSON 备份"
      @change="importFile"
    />
  </div>
</template>
