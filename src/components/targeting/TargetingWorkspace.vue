<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ResumeWorkspace } from '../../types/workspace'
// import VersionManager from './VersionManager.vue'
import TargetStrategy from './TargetStrategy.vue'
const workspace = defineModel<ResumeWorkspace>({ required: true })
defineEmits<{ create: [company: string, role: string]; duplicate: []; remove: [] }>()
const open = ref(false)
const active = computed({
  get: () => workspace.value.variants.find((item) => item.id === workspace.value.activeId)!,
  set: (value) => {
    const index = workspace.value.variants.findIndex((item) => item.id === value.id)
    if (index >= 0) workspace.value.variants[index] = value
  },
})
watch(
  () => workspace.value.activeId,
  () => {
    open.value = active.value.kind === 'target'
  },
)
</script>
<template>
  <!-- <VersionManager
    v-model="workspace"
    :active="active"
    :strategy-open="open"
    @create="(company, role) => $emit('create', company, role)"
    @duplicate="$emit('duplicate')"
    @remove="$emit('remove')"
    @strategy="open = !open"
  /> -->
  <TargetStrategy v-if="open && active.kind === 'target'" :key="active.id" v-model="active" />
</template>
