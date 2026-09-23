import { ref } from 'vue'
import { parseBackup } from '../types/resume'
import { parseWorkspaceBackup } from '../types/workspace'
import { download } from '../lib/files'
import { exportMarkdown } from '../lib/markdown'
import { projectResume, variantFilename } from '../lib/targeting'
import type { useResume } from './useResume'
export type ResumeFileAction = 'backup' | 'current-backup' | 'markdown' | 'reset' | 'print'
export function useResumeFiles(state: ReturnType<typeof useResume>) {
  const notice = ref('')
  async function importBackup(file: File) {
    const targetId = state.activeVariant.value.id
    const targetName = state.activeVariant.value.name
    try {
      if (file.size > 32_000_000) throw new Error('请选择 32 MB 以内的 JSON 备份。')
      const text = await file.text()
      const value = JSON.parse(text)
      if (value && typeof value === 'object' && 'format' in value) {
        const workspace = parseWorkspaceBackup(text)
        if (
          window.confirm(
            '这是一份完整版本库备份，将替换所有简历版本及投递策略。请确认已备份当前版本库。',
          )
        ) {
          state.replaceWorkspace(workspace)
          notice.value = '全部简历版本及投递策略已恢复。'
        }
      } else {
        const document = parseBackup(text)
        if (
          window.confirm(
            `这是单份简历备份，将只替换“${targetName}”的内容，其他版本保留。是否继续？`,
          )
        ) {
          state.replace(document, targetId)
          notice.value = '当前版本的简历内容已恢复，其他版本未修改。'
        }
      }
    } catch (error) {
      notice.value =
        error instanceof SyntaxError
          ? '文件不是有效的 JSON 备份，当前内容未修改。'
          : (error as Error).message
    }
  }
  async function handleAction(action: ResumeFileAction) {
    const variant = state.activeVariant.value
    const name = variantFilename(variant)
    if (action === 'backup')
      download(
        JSON.stringify(state.workspace.value, null, 2),
        `${variant.resume.profile.name || '简历'}-完整版本库.json`,
        'application/json',
      )
    if (action === 'current-backup')
      download(JSON.stringify(projectResume(variant), null, 2), `${name}.json`, 'application/json')
    if (action === 'markdown')
      download(exportMarkdown(projectResume(variant)), `${name}.md`, 'text/markdown;charset=utf-8')
    if (action === 'print') {
      const title = document.title
      document.title = name
      try {
        window.print()
      } finally {
        document.title = title
      }
    }
    if (
      action === 'reset' &&
      window.confirm(
        variant.kind === 'base'
          ? '将基础简历恢复为 PDF 默认内容。其他投递版本保留，是否继续？'
          : `将“${variant.name}”的内容恢复为当前基础简历，并重新显示所有条目。公司、岗位与策略记录保留，是否继续？`,
      )
    ) {
      try {
        await state.resetCurrent()
        notice.value = '当前版本内容已恢复，其他版本未修改。'
      } catch (error) {
        notice.value = (error as Error).message
      }
    }
  }
  return { notice, importBackup, handleAction }
}
