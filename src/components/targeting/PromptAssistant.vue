<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ResumeVariant } from '../../types/workspace'
import { buildTargetPrompt } from '../../lib/targetPrompt'
const props = defineProps<{ variant: ResumeVariant }>()
const open = ref(false)
const message = ref('')
const prompt = computed(() => buildTargetPrompt(props.variant))
async function copy() {
  try {
    await navigator.clipboard.writeText(prompt.value)
    message.value = '提示词已复制，可粘贴到你常用的 AI 工具。'
  } catch {
    message.value = '浏览器不允许自动复制，请在下方文本框中全选并复制。'
  }
}
</script>
<template>
  <section class="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h3 class="text-sm font-semibold text-indigo-800">交给 AI 前，先把背景准备好</h3>
        <p class="mt-1 text-xs leading-5 text-slate-500">
          生成岗位要求、经历证据和取舍分析提示词。这里不调用 AI，也不会自动改写简历。
        </p>
      </div>
      <button class="btn" :aria-expanded="open" @click="open = !open">
        {{ open ? '收起提示词' : '生成分析提示词' }}
      </button>
    </div>
    <div v-if="open" class="mt-4 space-y-3">
      <p class="text-xs leading-5 text-slate-500">
        已去掉基本信息中的姓名、联系方式、年龄和照片；经历正文仍可能包含个人或项目信息，请先检查再分享。AI
        建议可整理到上方的取舍理由中，再在编辑区手动采纳。
      </p>
      <textarea
        :value="prompt"
        aria-label="AI 分析提示词"
        readonly
        class="field h-64 font-mono text-xs leading-6"
      />
      <div class="flex items-center gap-3">
        <button class="btn-primary" @click="copy">复制分析提示词</button>
        <p role="status" class="text-xs text-indigo-700">{{ message }}</p>
      </div>
    </div>
  </section>
</template>
