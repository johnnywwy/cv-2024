<script setup lang="ts">
import AppIcon from '../AppIcon.vue'
defineProps<{ name: string; status: string; storageBlocked: boolean }>()
const mobileView = defineModel<'editor' | 'preview'>({ required: true })
</script>
<template>
  <div
    class="no-print mx-auto flex max-w-[1800px] items-center justify-between gap-3 px-5 py-4 sm:px-7"
  >
    <div class="flex items-center gap-2 text-xs">
      <span class="text-slate-400">我的简历</span>
      <AppIcon name="arrow" :size="12" />
      <span class="font-medium text-slate-600">{{ name || '未命名' }}的简历</span>
      <span class="ml-1 rounded bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-500">
        个人空间
      </span>
    </div>
    <span class="hidden text-[11px] text-slate-400 sm:inline">无需登录 · 本地保存 · 随时导出</span>
  </div>
  <div class="no-print mx-5 mb-3 flex items-center justify-between lg:hidden">
    <div class="flex gap-1 rounded-lg bg-slate-200/60 p-1">
      <button
        class="rounded-md px-4 py-1.5 text-xs"
        :class="mobileView === 'editor' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'"
        @click="mobileView = 'editor'"
      >
        编辑内容
      </button>
      <button
        class="rounded-md px-4 py-1.5 text-xs"
        :class="mobileView === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'"
        @click="mobileView = 'preview'"
      >
        预览简历
      </button>
    </div>
  </div>
  <p
    class="no-print mx-5 mb-3 text-xs xl:hidden"
    :class="storageBlocked ? 'text-amber-700' : 'text-slate-400'"
    role="status"
  >
    {{ status }}
  </p>
</template>
