import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { get, set } from 'idb-keyval'
import { createDefaultResume, loadDefaultResume } from '../data/defaultResume'
import { mergeShsopWorkHistory, type ResumeDocument } from '../types/resume'
import {
  cloneResume,
  createVariant,
  createWorkspace,
  parseWorkspaceBackup,
  type ResumeWorkspace,
} from '../types/workspace'

export const WORKSPACE_KEY = 'resume-studio:workspace:v2'
export const LEGACY_KEY = 'resume-studio:v1'
export function useResume() {
  const workspace = ref<ResumeWorkspace>(createWorkspace(createDefaultResume()))
  const activeVariant = computed(() =>
    workspace.value.variants.find((item) => item.id === workspace.value.activeId)!,
  )
  const baseVariant = computed(() => workspace.value.variants.find((item) => item.kind === 'base')!)
  const resume = computed({
    get: () => activeVariant.value.resume,
    set: (value) => {
      activeVariant.value.resume = value
    },
  })
  const ready = ref(false)
  const status = ref('正在读取本地简历…')
  const storageBlocked = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  let revision = 0
  let queue = Promise.resolve()
  const save = () => {
    if (!ready.value || storageBlocked.value) return
    const snapshot = JSON.stringify(workspace.value)
    const current = revision
    queue = queue
      .catch(() => {})
      .then(async () => {
        try {
          await set(WORKSPACE_KEY, snapshot)
          if (current === revision) status.value = '所有版本已保存到此浏览器'
        } catch {
          status.value = '保存失败，请导出 JSON 备份'
        }
      })
  }
  const flush = () => {
    clearTimeout(timer)
    save()
  }
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') flush()
  }
  onMounted(async () => {
    try {
      const saved = await get<string>(WORKSPACE_KEY)
      const legacy = saved === undefined ? await get<string>(LEGACY_KEY) : undefined
      workspace.value =
        saved !== undefined
          ? parseWorkspaceBackup(saved)
          : legacy !== undefined
            ? parseWorkspaceBackup(legacy)
            : createWorkspace(await loadDefaultResume())
      workspace.value.variants = workspace.value.variants.map((variant) => ({
        ...variant,
        resume: mergeShsopWorkHistory(variant.resume),
        hiddenEntryIds: variant.hiddenEntryIds.map((entryId) =>
          entryId === 'p-health' ? 'p-clinical' : entryId,
        ),
      }))
      status.value =
        legacy !== undefined ? '原简历已迁移为基础简历，旧数据仍保留' : '已恢复简历版本库'
    } catch {
      storageBlocked.value = true
      status.value = '本地数据读取失败；已保留原数据，请导出备份或明确恢复版本库'
    } finally {
      ready.value = true
      if (!storageBlocked.value) save()
    }
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', flush)
  })
  watch(
    workspace,
    () => {
      revision++
      if (!ready.value || storageBlocked.value) return
      status.value = '正在保存…'
      clearTimeout(timer)
      timer = setTimeout(save, 250)
    },
    { deep: true, flush: 'sync' },
  )
  function replace(document: ResumeDocument, id = workspace.value.activeId) {
    const target = workspace.value.variants.find((item) => item.id === id)
    if (!target) return
    clearTimeout(timer)
    storageBlocked.value = false
    target.resume = document
    flush()
  }
  function replaceWorkspace(value: ResumeWorkspace) {
    clearTimeout(timer)
    storageBlocked.value = false
    workspace.value = value
    flush()
  }
  function addTarget(company: string, role: string) {
    if (workspace.value.variants.length >= 50)
      throw new Error('最多保留 50 个版本，请先备份并删除不用的版本。')
    if (company.length > 200 || role.length > 200)
      throw new Error('公司和岗位名称请控制在 200 字以内。')
    if (!company.trim() || !role.trim()) throw new Error('请填写公司和岗位。')
    const variant = createVariant(baseVariant.value.resume, 'target', company.trim(), role.trim())
    variant.resume.profile.role = role.trim()
    workspace.value.variants.push(variant)
    workspace.value.activeId = variant.id
    return variant
  }
  function duplicateActive() {
    if (workspace.value.variants.length >= 50) throw new Error('最多保留 50 个版本。')
    const current = activeVariant.value
    const copy = {
      ...current,
      id: crypto.randomUUID(),
      kind: 'target' as const,
      name: `${current.name} 副本`.slice(0, 200),
      hiddenEntryIds: [...current.hiddenEntryIds],
      resume: cloneResume(current.resume),
    }
    workspace.value.variants.push(copy)
    workspace.value.activeId = copy.id
  }
  function removeActive() {
    if (activeVariant.value.kind === 'base') return
    const id = workspace.value.activeId
    workspace.value.activeId = baseVariant.value.id
    workspace.value.variants = workspace.value.variants.filter((item) => item.id !== id)
  }
  async function resetCurrent() {
    const id = activeVariant.value.id
    const document =
      activeVariant.value.kind === 'base'
        ? await loadDefaultResume()
        : cloneResume(baseVariant.value.resume)
    const target = workspace.value.variants.find((item) => item.id === id)
    if (!target) return
    if (target.kind === 'target' && target.role) document.profile.role = target.role
    target.resume = document
    target.hiddenEntryIds = []
    storageBlocked.value = false
    flush()
  }
  onBeforeUnmount(() => {
    flush()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('pagehide', flush)
  })
  return {
    workspace,
    activeVariant,
    baseVariant,
    resume,
    ready,
    status,
    storageBlocked,
    replace,
    replaceWorkspace,
    addTarget,
    duplicateActive,
    removeActive,
    resetCurrent,
  }
}
