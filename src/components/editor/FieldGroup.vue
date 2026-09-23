<script setup lang="ts" generic="T extends object">
import FormField from '../FormField.vue'
import type { FieldDefinition } from '../../config/editor'
const model = defineModel<T>({ required: true })
defineProps<{ fields: FieldDefinition<T>[]; columns?: boolean }>()
function update(key: keyof T, value: string) {
  model.value = { ...model.value, [key]: value }
}
</script>
<template>
  <div :class="columns ? 'grid grid-cols-2 gap-4' : 'space-y-4'">
    <FormField
      v-for="field in fields"
      :key="field.key"
      :label="field.label"
      :type="field.type"
      :placeholder="field.placeholder"
      :model-value="String(model[field.key] ?? '')"
      @update:model-value="update(field.key, $event)"
    />
  </div>
</template>
