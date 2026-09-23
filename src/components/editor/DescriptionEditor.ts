import { defineAsyncComponent } from 'vue'
// Shared lazy boundary: every section uses the same editor implementation and chunk.
export default defineAsyncComponent(() => import('../MarkdownEditor.vue'))
