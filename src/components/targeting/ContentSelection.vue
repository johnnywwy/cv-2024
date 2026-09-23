<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeVariant } from '../../types/workspace'
const variant = defineModel<ResumeVariant>({ required: true })
const groups = computed(() => [
  {
    title: '教育经历',
    items: variant.value.resume.education.map((item) => ({
      id: item.id,
      title: item.title,
      parent: '',
    })),
  },
  {
    title: '工作与公司项目',
    items: variant.value.resume.work.flatMap((job) => [
      { id: job.id, title: job.title, parent: '' },
      ...job.projects.map((project) => ({ id: project.id, title: project.title, parent: job.id })),
    ]),
  },
  {
    title: '个人项目',
    items: variant.value.resume.projects.map((item) => ({
      id: item.id,
      title: item.title,
      parent: '',
    })),
  },
])
function toggle(id: string, event: Event) {
  const hidden = new Set(variant.value.hiddenEntryIds)
  if ((event.target as HTMLInputElement).checked) hidden.delete(id)
  else hidden.add(id)
  variant.value.hiddenEntryIds = [...hidden]
}
</script>
<template>
  <div class="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-semibold">这次投递展示什么</h3>
      <button class="text-xs text-indigo-600" @click="variant.hiddenEntryIds = []">全部显示</button>
    </div>
    <p class="mt-1 text-xs leading-5 text-slate-400">
      取消勾选只影响当前版本的预览和导出，编辑区仍保留原文。顺序和表达请在下方编辑区调整。
    </p>
    <div class="mt-4 grid gap-4 sm:grid-cols-3">
      <div v-for="group in groups" :key="group.title">
        <h4 class="mb-2 text-xs font-semibold text-slate-500">{{ group.title }}</h4>
        <p v-if="!group.items.length" class="text-xs text-slate-400">暂无条目</p>
        <label
          v-for="item in group.items"
          :key="item.id"
          class="mb-2 flex items-start gap-2 text-xs leading-5 text-slate-600"
          :class="{
            'ml-4': item.parent,
            'opacity-40': item.parent && variant.hiddenEntryIds.includes(item.parent),
          }"
        >
          <input
            type="checkbox"
            class="mt-1 accent-indigo-600"
            :checked="!variant.hiddenEntryIds.includes(item.id)"
            :disabled="!!item.parent && variant.hiddenEntryIds.includes(item.parent)"
            @change="toggle(item.id, $event)"
          />
          {{ item.title || '未命名条目' }}
        </label>
      </div>
    </div>
  </div>
</template>
