import type { Ref } from 'vue'
/** All ordered resume collections share the same immutable update operations. */
export function useEntryCollection<T>(items: Ref<T[]>, create: () => T) {
  function add() {
    items.value = [...items.value, create()]
  }
  function move(index: number, direction: number) {
    const next = index + direction
    if (index < 0 || index >= items.value.length || next < 0 || next >= items.value.length) return
    const reordered = [...items.value]
    const [item] = reordered.splice(index, 1)
    reordered.splice(next, 0, item)
    items.value = reordered
  }
  function remove(index: number) {
    items.value = items.value.filter((_, i) => i !== index)
  }
  return { add, move, remove }
}
