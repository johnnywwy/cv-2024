<script setup lang="ts">
import type { ResumeVariant } from '../../types/workspace'
import FormField from '../FormField.vue'
import ContentSelection from './ContentSelection.vue'
import PromptAssistant from './PromptAssistant.vue'
const variant = defineModel<ResumeVariant>({ required: true })
function setTarget(field: 'company' | 'role', value: string) {
  variant.value[field] = value.slice(0, 200)
  variant.value.name =
    `${variant.value.company || '未命名公司'} · ${variant.value.role || '未命名岗位'}`.slice(0, 200)
}
</script>
<template>
  <section
    class="no-print mx-5 mb-4 space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:mx-7"
    aria-label="投递策略"
  >
    <div>
      <h2 class="text-base font-semibold">为这次机会，选择更合适的表达</h2>
      <p class="mt-1 text-xs text-slate-400">
        公司、岗位、取舍理由和决策只保存在版本库中，不会出现在导出的简历里。
      </p>
    </div>
    <div class="grid gap-4 sm:grid-cols-3">
      <FormField
        :model-value="variant.company"
        label="公司名称"
        @update:model-value="setTarget('company', $event)"
      />
      <FormField
        :model-value="variant.role"
        label="岗位名称"
        @update:model-value="setTarget('role', $event)"
      />
      <div>
        <label for="target-decision" class="field-label">我的投递决策</label>
        <select id="target-decision" v-model="variant.decision" class="field">
          <option value="undecided">尚未决定</option>
          <option value="prepare">先补充材料 / 准备</option>
          <option value="apply">计划投递</option>
          <option value="hold">暂缓投递</option>
        </select>
      </div>
    </div>
    <div class="grid gap-4 lg:grid-cols-2">
      <div>
        <label for="target-jd" class="field-label">岗位描述（JD）</label>
        <textarea
          id="target-jd"
          v-model="variant.jobDescription"
          maxlength="100000"
          class="field min-h-40"
          placeholder="粘贴岗位职责、必备技能和加分项，作为调整依据。"
        />
      </div>
      <div class="space-y-3">
        <div>
          <label for="target-focus" class="field-label">这份简历的侧重点</label>
          <textarea
            id="target-focus"
            v-model="variant.focus"
            maxlength="100000"
            class="field min-h-16"
            placeholder="例如：突出复杂表单、医疗业务经验和前后端协作。"
          />
        </div>
        <div>
          <label for="target-rationale" class="field-label">取舍理由与待确认事项</label>
          <textarea
            id="target-rationale"
            v-model="variant.rationale"
            maxlength="100000"
            class="field min-h-16"
            placeholder="为什么突出这些项目？还缺哪些证据？有哪些问题需要在面试中确认？"
          />
        </div>
      </div>
    </div>
    <ContentSelection v-model="variant" />
    <PromptAssistant :variant="variant" />
  </section>
</template>
