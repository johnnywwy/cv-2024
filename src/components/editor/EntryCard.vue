<script setup lang="ts">
const props = defineProps<{ title: string; collapsible?: boolean }>()
// Initial expansion belongs to this keyed card, not to the editable title.
// Native details subsequently owns its state, including after field edits/reordering.
const initiallyOpen = !props.title
</script>
<template>
  <component
    :is="collapsible ? 'details' : 'section'"
    :class="collapsible ? 'rounded-lg border border-slate-200 p-3' : 'card space-y-4'"
    :open="collapsible && initiallyOpen"
  >
    <summary v-if="collapsible" class="cursor-pointer text-sm font-medium text-slate-600">
      {{ title || '新项目' }}
    </summary>
    <div :class="collapsible ? 'mt-3 space-y-3' : 'space-y-4'"><slot /></div>
  </component>
</template>
