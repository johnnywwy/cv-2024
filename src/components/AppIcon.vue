<script setup lang="ts">
defineProps<{ name: string; size?: number }>()
const paths: Record<string, string> = {
  document:
    'M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8l-5-5H8zm7 0v6h6M7 13h10M7 17h7',
  person: 'M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M12 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  education: 'm2 9 10-6 10 6-10 6L2 9zm4 3v6l6 3 6-3v-6M22 9v8',
  work: 'M9 7V4h6v3M3 7h18v14H3V7zm0 6 9 3 9-3M12 12v5',
  project: 'M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z',
  skills: 'm13 2-9 12h7l-1 8 10-12h-7l0-8z',
  settings: 'M4 7h16M4 17h16M8 4v6m8 4v6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  arrow: 'm9 5 7 7-7 7',
  eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
}
</script>
<template>
  <svg
    :width="size || 18"
    :height="size || 18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.document" />
  </svg>
</template>
