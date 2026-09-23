<script setup lang="ts">
import { useId } from 'vue'
withDefaults(defineProps<{ label: string; placeholder?: string; type?: string }>(), {
  placeholder: '',
  type: 'text',
})
const model = defineModel<string>({ required: true })
const id = useId()
</script>
<template>
  <div>
    <label :for="id" class="field-label">{{ label }}</label>
    <input :id="id" v-model="model" :type="type" :placeholder="placeholder" class="field" />
  </div>
</template>
