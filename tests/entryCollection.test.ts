import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useEntryCollection } from '../src/composables/useEntryCollection'

describe('ordered resume collections', () => {
  it('adds independent entries and preserves identity and content through sorting', () => {
    let id = 0
    const items = ref<{ id: string; title: string }[]>([])
    const collection = useEntryCollection(items, () => ({ id: String(++id), title: '' }))
    collection.add()
    items.value[0].title = '已有内容'
    collection.add()
    collection.move(1, -1)
    expect(items.value).toEqual([
      { id: '2', title: '' },
      { id: '1', title: '已有内容' },
    ])
    collection.remove(0)
    expect(items.value).toEqual([{ id: '1', title: '已有内容' }])
  })
  it('ignores out-of-bounds moves without mutating the original array', () => {
    const original = [{ id: 'a' }, { id: 'b' }]
    const items = ref(original)
    const collection = useEntryCollection(items, () => ({ id: 'c' }))
    collection.move(0, -1)
    collection.move(1, 1)
    collection.move(-1, 1)
    collection.move(2, -1)
    expect(items.value).toEqual(original)
    collection.move(0, 1)
    expect(original).toEqual([{ id: 'a' }, { id: 'b' }])
    expect(items.value).toEqual([{ id: 'b' }, { id: 'a' }])
  })
})
