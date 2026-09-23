// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import source from '../src/data/resume.json'
import { resumeSchema } from '../src/types/resume'
import { createVariant, createWorkspace, parseWorkspaceBackup } from '../src/types/workspace'
import { projectResume, variantFilename } from '../src/lib/targeting'
import { buildTargetPrompt } from '../src/lib/targetPrompt'
import { exportMarkdown } from '../src/lib/markdown'

describe('targeted resumes', () => {
  it('round-trips full strategy and independent resumes, and accepts legacy backups', () => {
    const workspace = createWorkspace(resumeSchema.parse(source))
    const target = createVariant(workspace.variants[0].resume, 'target', '目标公司', '前端岗位')
    target.jobDescription = 'React 和医疗业务经验'
    target.focus = '复杂表单'
    target.decision = 'prepare'
    target.hiddenEntryIds = [source.projects[0].id]
    workspace.variants.push(target)
    workspace.activeId = target.id
    expect(parseWorkspaceBackup(JSON.stringify(workspace))).toEqual(workspace)
    expect(parseWorkspaceBackup(JSON.stringify(source)).variants[0].resume).toEqual(source)
  })
  it('rejects duplicate version IDs, missing active versions and multiple base resumes', () => {
    const workspace = createWorkspace(resumeSchema.parse(source))
    expect(() =>
      parseWorkspaceBackup(JSON.stringify({ ...workspace, activeId: 'missing' })),
    ).toThrow()
    expect(() =>
      parseWorkspaceBackup(
        JSON.stringify({ ...workspace, variants: [workspace.variants[0], workspace.variants[0]] }),
      ),
    ).toThrow()
    expect(() =>
      parseWorkspaceBackup(
        JSON.stringify({ ...workspace, variants: [{ ...workspace.variants[0], kind: 'target' }] }),
      ),
    ).toThrow()
  })
  it('uses the same selection for preview and export without deleting editable content', () => {
    const target = createVariant(resumeSchema.parse(source), 'target', '甲', '前端')
    target.hiddenEntryIds = [
      source.projects[0].id,
      source.work[0].projects[0].id,
      source.work[1].id,
    ]
    const output = projectResume(target)
    expect(output.projects).toHaveLength(0)
    expect(output.work).toHaveLength(2)
    expect(output.work[0].projects).toHaveLength(0)
    expect(exportMarkdown(output)).not.toContain('会议室在线预约系统')
    expect(exportMarkdown(output)).not.toContain('珠海爱蒲京软件')
    expect(target.resume).toEqual(source)
    target.hiddenEntryIds = []
    expect(projectResume(target)).toEqual(source)
    expect(variantFilename(target)).toContain('甲 · 前端')
  })
  it('prepares evidence-based AI input without basic contact details or invented scores', () => {
    const target = createVariant(resumeSchema.parse(source), 'target', '目标公司', 'React 岗位')
    target.jobDescription = '擅长 React 与动态表单'
    const prompt = buildTargetPrompt(target)
    expect(prompt).toContain(target.jobDescription)
    expect(prompt).toContain('Medication')
    expect(prompt).not.toContain(source.profile.email)
    expect(prompt).not.toContain(source.profile.phone)
    expect(prompt).not.toContain(source.profile.name)
    expect(prompt).toContain('不能编造')
    expect(prompt).toContain('待确认问题')
  })
})
