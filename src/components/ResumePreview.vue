<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import type { ResumeDocument } from '../types/resume'
import ResumeContent from './preview/ResumeContent.vue'
import AppIcon from './AppIcon.vue'
const props = defineProps<{ resume: ResumeDocument }>()
const container = ref<HTMLElement>()
const paper = ref<HTMLElement>()
const scale = ref(1)
const height = ref(1123)
let observer: ResizeObserver | undefined
function measure() {
  if (container.value && paper.value) {
    scale.value = Math.min(1, Math.max(0.2, (container.value.clientWidth - 40) / 794))
    height.value = paper.value.offsetHeight * scale.value
  }
}
onMounted(() => {
  observer = new ResizeObserver(measure)
  if (container.value) observer.observe(container.value)
  if (paper.value) observer.observe(paper.value)
  measure()
})
watch(
  () => props.resume,
  async () => {
    await nextTick()
    measure()
  },
  { deep: true },
)
onBeforeUnmount(() => observer?.disconnect())
</script>
<template>
  <section class="preview-pane min-w-0 overflow-y-auto bg-[#eaeef4]">
    <div
      class="no-print flex items-center justify-between border-b border-slate-200/80 bg-[#f4f6fa] px-6 py-3.5"
    >
      <div class="flex items-center gap-2 text-xs font-medium text-slate-500">
        <AppIcon name="eye" :size="16" />
        实时预览
        <span class="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
      </div>
      <div class="flex items-center gap-3 text-[11px] text-slate-400">
        <span>A4 · 连续预览</span>
        <span class="rounded border border-slate-200 bg-white px-2 py-0.5 font-mono">
          {{ Math.round(scale * 100) }}%
        </span>
      </div>
    </div>
    <div ref="container" class="preview-scroll overflow-hidden px-5 py-7">
      <div
        class="preview-scale mx-auto"
        :style="{ width: `${794 * scale}px`, height: `${height}px` }"
      >
        <article
          ref="paper"
          aria-label="简历预览"
          class="resume-paper origin-top-left shadow-[0_8px_40px_-12px_rgba(30,41,59,.2)]"
          :style="{
            transform: `scale(${scale})`,
            '--resume-color': resume.appearance.color,
            '--resume-font-size': `${resume.appearance.fontSize}px`,
          }"
        >
          <ResumeContent :resume="resume" />
        </article>
      </div>
      <p class="no-print mt-6 text-center text-[11px] tracking-wide text-slate-400">
        每一段经历，都值得被认真呈现。
      </p>
    </div>
  </section>
</template>
