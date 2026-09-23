// @vitest-environment jsdom
import { expect, it } from 'vitest'
import { createApp, h, nextTick, ref } from 'vue'
import EntryCard from '../src/components/editor/EntryCard.vue'

it('keeps expansion independent from project name edits and respects manual collapse', async () => {
  const title = ref('')
  const host = document.createElement('div')
  const app = createApp({ render: () => h(EntryCard, { title: title.value, collapsible: true }) })
  app.mount(host)
  try {
    const details = host.querySelector('details')!
    expect(details.open).toBe(true)
    title.value = '新项目名称'
    await nextTick()
    expect(details.open).toBe(true)
    expect(details.querySelector('summary')?.textContent).toBe('新项目名称')
    details.open = false
    title.value = '再次编辑'
    await nextTick()
    expect(details.open).toBe(false)
  } finally {
    app.unmount()
  }
})
