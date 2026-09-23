<script setup lang="ts" generic="T extends { id: string; title: string }">
import ItemActions from '../ItemActions.vue'
import AppIcon from '../AppIcon.vue'
import EntryCard from './EntryCard.vue'
import { useEntryCollection } from '../../composables/useEntryCollection'
const items = defineModel<T[]>({ required: true })
const props = defineProps<{
  label: string
  create: () => T
  collapsible?: boolean
  addLabel?: string
}>()
defineSlots<{ default(props: { item: T; index: number }): unknown }>()
const { add, move, remove } = useEntryCollection(items, props.create)
function confirmRemove(index: number) {
  if (window.confirm('删除这条内容？建议先导出备份，删除后将自动保存。')) remove(index)
}
</script>
<template>
  <div class="space-y-5">
    <EntryCard
      v-for="(item, index) in items"
      :key="item.id"
      :title="item.title"
      :collapsible="collapsible"
    >
      <div class="flex items-center justify-between">
        <h3 v-if="!collapsible" class="text-sm font-semibold">{{ label }} {{ index + 1 }}</h3>
        <ItemActions
          class="ml-auto"
          :index="index"
          :count="items.length"
          :label="item.title || label"
          @move="move(index, $event)"
          @remove="confirmRemove(index)"
        />
      </div>
      <slot :item="item" :index="index" />
    </EntryCard>
    <button class="btn w-full border-dashed" :class="{ 'text-xs': collapsible }" @click="add">
      <AppIcon name="plus" :size="collapsible ? 14 : 18" />
      {{ addLabel || `添加${label}` }}
    </button>
  </div>
</template>
