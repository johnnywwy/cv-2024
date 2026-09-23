// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick, type App } from 'vue'
import source from '../src/data/resume.json'
import { resumeSchema } from '../src/types/resume'
const storage = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn() }))
vi.mock('idb-keyval', () => storage)
vi.mock('../src/data/defaultResume', () => ({
  createDefaultResume: () => structuredClone(source),
  loadDefaultResume: async () => structuredClone(source),
}))
import { useResume, WORKSPACE_KEY, LEGACY_KEY } from '../src/composables/useResume'
import { createWorkspace } from '../src/types/workspace'
let app: App
let state: ReturnType<typeof useResume>
async function mount() {
  app = createApp({
    setup() {
      state = useResume()
      return () => null
    },
  })
  app.mount(document.createElement('div'))
  await nextTick()
  await vi.advanceTimersByTimeAsync(1)
}
beforeEach(() => {
  vi.useFakeTimers()
  storage.get.mockReset()
  storage.set.mockReset()
  storage.set.mockResolvedValue(undefined)
})
afterEach(() => {
  app?.unmount()
  vi.useRealTimers()
})
describe('local draft persistence', () => {
  it('migrates the old draft without changing or deleting the old storage key', async () => {
    const old = resumeSchema.parse(source)
    old.profile.name = '旧简历的修改'
    storage.get.mockImplementation(async (key: string) =>
      key === LEGACY_KEY ? JSON.stringify(old) : undefined,
    )
    await mount()
    expect(state.workspace.value.variants).toHaveLength(1)
    expect(state.baseVariant.value.resume.profile.name).toBe('旧简历的修改')
    expect(storage.set.mock.calls.every((call) => call[0] === WORKSPACE_KEY)).toBe(true)
  })
  it('isolates base and target edits and preserves them on switching and duplication', async () => {
    storage.get.mockResolvedValue(JSON.stringify(createWorkspace(resumeSchema.parse(source))))
    await mount()
    const baseId = state.workspace.value.activeId
    const first = state.addTarget('甲公司', '前端工程师')
    state.resume.value.work[0].projects[0].description = '甲公司的表达'
    state.activeVariant.value.hiddenEntryIds = [source.projects[0].id]
    state.duplicateActive()
    state.activeVariant.value.hiddenEntryIds.push(source.work[0].id)
    expect(first.hiddenEntryIds).toEqual([source.projects[0].id])
    const second = state.addTarget('乙公司', '后端工程师')
    expect(second.resume.work[0].projects[0].description).not.toBe('甲公司的表达')
    state.workspace.value.activeId = first.id
    expect(state.resume.value.work[0].projects[0].description).toBe('甲公司的表达')
    state.workspace.value.activeId = baseId
    expect(state.resume.value.profile.role).toBe(source.profile.role)
    state.removeActive()
    expect(state.workspace.value.variants.some((item) => item.id === baseId)).toBe(true)
  })
  it('does not fall back to legacy content when the new workspace is corrupt', async () => {
    storage.get.mockImplementation(async (key: string) =>
      key === WORKSPACE_KEY ? '{broken' : JSON.stringify(source),
    )
    await mount()
    expect(state.storageBlocked.value).toBe(true)
    expect(storage.get).toHaveBeenCalledTimes(1)
    expect(storage.set).not.toHaveBeenCalled()
  })

  it('restores a saved document without replacing it with the default', async () => {
    const saved = resumeSchema.parse(source)
    saved.profile.name = '已保存的姓名'
    storage.get.mockResolvedValue(JSON.stringify(saved))
    await mount()
    expect(state.ready.value).toBe(true)
    expect(state.resume.value.profile.name).toBe('已保存的姓名')
  })
  it('keeps corrupt saved data intact until explicit replacement', async () => {
    storage.get.mockResolvedValue('{broken')
    await mount()
    state.resume.value.profile.name = '临时编辑'
    await vi.advanceTimersByTimeAsync(300)
    expect(state.storageBlocked.value).toBe(true)
    expect(storage.set).not.toHaveBeenCalled()
    state.replace(resumeSchema.parse(source))
    await vi.advanceTimersByTimeAsync(300)
    expect(state.storageBlocked.value).toBe(false)
    expect(storage.set).toHaveBeenCalled()
  })
  it('retains current edits and reports a write failure', async () => {
    storage.get.mockResolvedValue(JSON.stringify(source))
    await mount()
    storage.set.mockRejectedValue(new Error('Quota exceeded'))
    state.resume.value.profile.name = '仍需保留的编辑'
    await vi.advanceTimersByTimeAsync(300)
    expect(state.resume.value.profile.name).toBe('仍需保留的编辑')
    expect(state.status.value).toContain('保存失败')
  })
  it('debounces rapid edits and writes the latest snapshot', async () => {
    storage.get.mockResolvedValue(JSON.stringify(source))
    await mount()
    storage.set.mockClear()
    state.resume.value.profile.name = '第一版'
    state.resume.value.profile.name = '第二版'
    await vi.advanceTimersByTimeAsync(300)
    expect(storage.set).toHaveBeenCalledTimes(1)
    expect(JSON.parse(storage.set.mock.calls[0][1]).variants[0].resume.profile.name).toBe('第二版')
  })
})
