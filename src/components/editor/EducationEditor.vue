<script setup lang="ts">
import { newEntry, type Entry } from '../../types/resume'
import { educationFields } from '../../config/editor'
import EntryCollection from './EntryCollection.vue'
import FieldGroup from './FieldGroup.vue'
import DescriptionEditor from './DescriptionEditor'
const entries = defineModel<Entry[]>({ required: true })
</script>
<template>
  <EntryCollection v-model="entries" label="教育经历" :create="newEntry">
    <template #default="{ item, index }">
      <FieldGroup v-model="entries[index]" :fields="educationFields" />
      <DescriptionEditor v-model="item.description" label="补充说明（选填）" />
    </template>
  </EntryCollection>
</template>
