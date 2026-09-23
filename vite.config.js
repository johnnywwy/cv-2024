import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/cv-wwy/',
  build: {
    rollupOptions: {
      output: {
        onlyExplicitManualChunks: true,
        manualChunks(id) {
          if (id.includes('prosemirror-')) return 'editor-engine'
          if (id.includes('@tiptap')) return 'editor'
        },
      },
    },
  },
})
