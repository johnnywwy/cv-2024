<script setup lang="ts">
defineProps<{ index: number; count: number; label: string }>()
defineEmits<{ move: [direction: number]; remove: [] }>()
</script>
<template>
  <div class="flex items-center gap-1">
    <button
      class="rounded px-2 py-1 text-xs text-slate-400 hover:bg-slate-100"
      :disabled="index === 0"
      :aria-label="`上移${label}`"
      @click="$emit('move', -1)"
    >
      ↑
    </button>
    <button
      class="rounded px-2 py-1 text-xs text-slate-400 hover:bg-slate-100"
      :disabled="index === count - 1"
      :aria-label="`下移${label}`"
      @click="$emit('move', 1)"
    >
      ↓
    </button>
    <button
      class="rounded px-2 py-1 text-xs text-slate-400 hover:bg-red-50 hover:text-red-600"
      :aria-label="`删除${label}`"
      @click="$emit('remove')"
    >
      删除
    </button>
  </div>
</template>
