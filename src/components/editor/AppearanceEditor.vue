<script setup lang="ts">
import type { ResumeDocument } from '../../types/resume'
const appearance = defineModel<ResumeDocument['appearance']>({ required: true })
</script>
<template>
  <div class="space-y-5">
    <div class="card space-y-5">
      <div>
        <label for="theme-color" class="field-label">简历主题色</label>
        <div class="flex items-center gap-3">
          <input
            id="theme-color"
            v-model="appearance.color"
            type="color"
            class="h-9 w-12 cursor-pointer rounded border border-slate-200"
          />
          <span class="font-mono text-xs text-slate-400">{{ appearance.color }}</span>
          <button
            v-for="color in ['#5267b8', '#0f766e', '#334155', '#9f4565']"
            :key="color"
            class="h-6 w-6 rounded-full border-2 border-white shadow-sm"
            :style="{ backgroundColor: color }"
            :aria-label="`主题色 ${color}`"
            @click="appearance.color = color"
          ></button>
        </div>
      </div>
      <div>
        <label for="font-size" class="field-label">正文字号 · {{ appearance.fontSize }} px</label>
        <input
          id="font-size"
          v-model.number="appearance.fontSize"
          type="range"
          min="12"
          max="17"
          step="0.5"
          class="w-full accent-indigo-600"
        />
        <div class="flex justify-between text-xs text-slate-400">
          <span>紧凑</span>
          <span>舒展</span>
        </div>
      </div>
    </div>
    <p class="text-xs leading-6 text-slate-400">
      采用 A4 纸张。导出时选择“另存为
      PDF”，关闭浏览器的页眉和页脚。长篇内容会自动分页，预览展示连续文档。
    </p>
  </div>
</template>
