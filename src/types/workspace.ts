import { z } from 'zod'
import { parseBackup, resumeSchema, type ResumeDocument } from './resume'

const note = z.string().max(100_000)
export const variantSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['base', 'target']),
  name: z.string().min(1).max(200),
  company: z.string().max(200),
  role: z.string().max(200),
  jobDescription: note,
  focus: note,
  rationale: note,
  hiddenEntryIds: z.array(z.string()).max(10000).default([]),
  decision: z.enum(['undecided', 'prepare', 'apply', 'hold']),
  resume: resumeSchema,
})
export const workspaceSchema = z
  .object({
    format: z.literal('resume-studio-workspace'),
    version: z.literal(2),
    activeId: z.string().min(1),
    variants: z.array(variantSchema).min(1).max(50),
  })
  .superRefine((workspace, context) => {
    const ids = workspace.variants.map((item) => item.id)
    if (new Set(ids).size !== ids.length || !ids.includes(workspace.activeId))
      context.addIssue({ code: 'custom', message: '版本标识或当前版本无效' })
    if (workspace.variants.filter((item) => item.kind === 'base').length !== 1)
      context.addIssue({ code: 'custom', message: '必须且只能保留一份基础简历' })
    for (const item of workspace.variants) {
      try {
        parseBackup(JSON.stringify(item.resume))
      } catch {
        context.addIssue({ code: 'custom', message: '简历条目数据无效' })
      }
    }
  })
export type ResumeVariant = z.infer<typeof variantSchema>
export type ResumeWorkspace = z.infer<typeof workspaceSchema>
export const cloneResume = (resume: ResumeDocument): ResumeDocument =>
  JSON.parse(JSON.stringify(resume))
export function createVariant(
  resume: ResumeDocument,
  kind: ResumeVariant['kind'],
  company = '',
  role = '',
): ResumeVariant {
  return {
    id: crypto.randomUUID(),
    kind,
    name: kind === 'base' ? '基础简历' : `${company} · ${role}`.slice(0, 200),
    company,
    role,
    jobDescription: '',
    focus: '',
    rationale: '',
    hiddenEntryIds: [],
    decision: 'undecided',
    resume: cloneResume(resume),
  }
}
export function createWorkspace(resume: ResumeDocument): ResumeWorkspace {
  const base = createVariant(resume, 'base')
  return { format: 'resume-studio-workspace', version: 2, activeId: base.id, variants: [base] }
}
/** Accept existing single-resume backups without weakening validation of new workspaces. */
export function parseWorkspaceBackup(source: string): ResumeWorkspace {
  if (source.length > 32_000_000) throw new Error('备份过大，请选择 32 MB 以内的文件。')
  const value: unknown = JSON.parse(source)
  if (typeof value === 'object' && value !== null && 'format' in value) {
    const result = workspaceSchema.safeParse(value)
    if (!result.success) throw new Error('版本库备份无效或版本不受支持，现有内容未修改。')
    return result.data
  }
  return createWorkspace(parseBackup(source))
}
