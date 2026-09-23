<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'
import { renderMarkdown, safeUrl } from '../lib/markdown'
const props = withDefaults(defineProps<{ label?: string }>(), { label: '详细描述' })
const model = defineModel<string>({ required: true })
const mode = ref<'visual' | 'source'>('visual')
const linkOpen = ref(false)
const linkUrl = ref('')
const linkError = ref('')
let internalUpdate = false
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4, 5, 6] },
      link: { openOnClick: false, protocols: ['http', 'https', 'mailto', 'tel'] },
    }),
    Markdown,
  ],
  content: renderMarkdown(model.value),
  editorProps: {
    attributes: { 'aria-label': props.label, role: 'textbox', 'aria-multiline': 'true' },
  },
  onUpdate: ({ editor }) => {
    internalUpdate = true
    model.value = editor.getMarkdown()
    internalUpdate = false
  },
})
watch(
  model,
  (value) => {
    if (!internalUpdate && mode.value === 'visual' && editor.value?.getMarkdown() !== value)
      editor.value?.commands.setContent(renderMarkdown(value), { emitUpdate: false })
  },
  { flush: 'sync' },
)
function switchMode(next: 'visual' | 'source') {
  if (next === 'visual')
    editor.value?.commands.setContent(renderMarkdown(model.value), { emitUpdate: false })
  mode.value = next
}
function toggleLink() {
  linkOpen.value = !linkOpen.value
  linkUrl.value = editor.value?.getAttributes('link').href || ''
}
function applyLink() {
  const href = safeUrl(linkUrl.value)
  if (linkUrl.value && !href) {
    linkError.value = '请输入完整的 https://、http://、mailto: 或 tel: 链接'
    return
  }
  if (href) editor.value?.chain().focus().extendMarkRange('link').setLink({ href }).run()
  else editor.value?.chain().focus().unsetLink().run()
  linkOpen.value = false
  linkError.value = ''
}
onBeforeUnmount(() => editor.value?.destroy())
</script>
<template>
  <div>
    <div class="mb-2 flex items-center justify-between gap-2">
      <span class="field-label mb-0">{{ label }}</span>
      <div class="flex rounded-md bg-slate-100 p-0.5 text-xs">
        <button
          type="button"
          class="rounded px-2.5 py-1"
          :class="mode === 'visual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'"
          :aria-pressed="mode === 'visual'"
          @click="switchMode('visual')"
        >
          可视化
        </button>
        <button
          type="button"
          class="rounded px-2.5 py-1"
          :class="mode === 'source' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'"
          :aria-pressed="mode === 'source'"
          @click="switchMode('source')"
        >
          Markdown
        </button>
      </div>
    </div>
    <div
      class="overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-indigo-300"
    >
      <template v-if="mode === 'visual' && editor">
        <div
          class="flex flex-wrap gap-1 border-b border-slate-100 bg-slate-50/80 p-1.5 text-xs text-slate-600"
        >
          <button
            type="button"
            class="rounded px-2 py-1 font-bold hover:bg-slate-200"
            :class="{ 'bg-indigo-100': editor.isActive('bold') }"
            title="加粗"
            @click="editor.chain().focus().toggleBold().run()"
          >
            B
          </button>
          <button
            type="button"
            class="rounded px-2 py-1 italic hover:bg-slate-200"
            title="斜体"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            I
          </button>
          <button
            type="button"
            class="rounded px-2 py-1 hover:bg-slate-200"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            标题
          </button>
          <button
            type="button"
            class="rounded px-2 py-1 hover:bg-slate-200"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            • 列表
          </button>
          <button
            type="button"
            class="rounded px-2 py-1 hover:bg-slate-200"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >
            1. 编号
          </button>
          <button
            type="button"
            class="rounded px-2 py-1 hover:bg-slate-200"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >
            引用
          </button>
          <button type="button" class="rounded px-2 py-1 hover:bg-slate-200" @click="toggleLink">
            链接
          </button>
          <button
            type="button"
            class="ml-auto rounded px-2 py-1 hover:bg-slate-200"
            title="撤销"
            @click="editor.chain().focus().undo().run()"
          >
            ↶
          </button>
        </div>
        <div v-if="linkOpen" class="border-b border-slate-100 p-2">
          <div class="flex gap-2">
            <input
              v-model="linkUrl"
              class="field"
              aria-label="链接地址"
              placeholder="https://example.com"
              @keydown.enter.prevent="applyLink"
            />
            <button class="btn" type="button" @click="applyLink">应用</button>
          </div>
          <p class="mt-1 text-xs text-slate-400">先选中文字；清空地址可移除链接。</p>
          <p v-if="linkError" class="text-xs text-red-600">{{ linkError }}</p>
        </div>
        <EditorContent :editor="editor" class="markdown-body text-sm leading-7" />
      </template>
      <textarea
        v-show="mode === 'source'"
        v-model="model"
        :aria-label="`${label} Markdown 源码`"
        class="min-h-56 w-full resize-y border-0 p-3 font-mono text-sm leading-7 outline-none"
        spellcheck="false"
      />
    </div>
    <p v-if="mode === 'source'" class="mt-2 text-xs leading-5 text-slate-400">
      支持标题、**加粗**、*斜体*、列表、链接和引用。HTML、图片与表格不在首版支持范围内。
    </p>
  </div>
</template>
