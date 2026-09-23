<script setup lang="ts">
import { ref } from 'vue'
import type { ResumeWorkspace, ResumeVariant } from '../../types/workspace'
import FormField from '../FormField.vue'
const workspace = defineModel<ResumeWorkspace>({ required: true })
defineProps<{ active: ResumeVariant; strategyOpen: boolean }>()
const emit = defineEmits<{
  create: [company: string, role: string]
  duplicate: []
  remove: []
  strategy: []
}>()
const creating = ref(false)
const company = ref('')
const role = ref('')
function create() {
  if (!company.value.trim() || !role.value.trim()) return
  emit('create', company.value, role.value)
  creating.value = false
  company.value = ''
  role.value = ''
}
function remove() {
  if (window.confirm('删除当前投递版本及其策略记录？基础简历和其他版本将保留。')) emit('remove')
}
</script>
<template>
  <section
    class="no-print mx-5 mb-4 rounded-xl border border-indigo-100 bg-white p-4 sm:mx-7"
    aria-label="简历版本管理"
  >
    <div class="flex flex-wrap items-end gap-3">
      <div class="min-w-48 flex-1">
        <label for="resume-version" class="field-label">
          当前编辑与导出版本 · {{ workspace.variants.length }} 份
        </label>
        <select id="resume-version" v-model="workspace.activeId" class="field">
          <option v-for="variant in workspace.variants" :key="variant.id" :value="variant.id">
            {{ variant.kind === 'base' ? '◎ ' : '↳ ' }}{{ variant.name }}
          </option>
        </select>
      </div>
      <button
        class="btn-primary"
        :disabled="workspace.variants.length >= 50"
        @click="creating = !creating"
      >
        ＋ 新建投递版本
      </button>
      <button class="btn" :disabled="workspace.variants.length >= 50" @click="$emit('duplicate')">
        复制当前版本
      </button>
      <template v-if="active.kind === 'target'">
        <button class="btn" :aria-expanded="strategyOpen" @click="$emit('strategy')">
          {{ strategyOpen ? '收起投递策略' : '投递策略' }}
        </button>
        <button class="btn text-red-500" @click="remove">删除版本</button>
      </template>
    </div>
    <p class="mt-2 text-xs leading-5 text-slate-400">
      基础简历保留完整经历。每个投递版本独立编辑，修改不会同步到其他版本；PDF 和 Markdown
      只导出当前版本选中的内容。
    </p>
    <form
      v-if="creating"
      class="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[1fr_1fr_auto]"
      @submit.prevent="create"
    >
      <FormField v-model="company" label="目标公司" placeholder="例如：某医疗科技公司" />
      <FormField v-model="role" label="目标岗位" placeholder="例如：全栈开发工程师" />
      <button
        class="btn-primary self-end"
        :disabled="!company.trim() || !role.trim() || company.length > 200 || role.length > 200"
      >
        从基础简历创建
      </button>
    </form>
  </section>
</template>
