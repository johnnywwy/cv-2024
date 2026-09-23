import { z } from 'zod'

const text = z.string().max(100_000)
const itemBase = {
  id: z.string().min(1),
  title: text,
  subtitle: text,
  period: text,
  description: text,
}
export const entrySchema = z.object(itemBase)
export const projectSchema = entrySchema.extend({ tags: text, url: text })
export const jobSchema = entrySchema.extend({ projects: z.array(projectSchema).max(100) })
export const resumeSchema = z.object({
  version: z.literal(1),
  profile: z.object({
    name: text,
    role: text,
    gender: text,
    age: text,
    phone: text,
    email: text,
    wechat: text,
    location: text,
    avatar: z
      .string()
      .max(4_000_000)
      .refine(
        (value) => !value || /^data:image\/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(value),
        '头像格式无效',
      ),
    showAvatar: z.boolean(),
  }),
  education: z.array(entrySchema).max(100),
  work: z.array(jobSchema).max(100),
  projects: z.array(projectSchema).max(100),
  skills: text,
  appearance: z.object({
    color: z.string().regex(/^#[0-9a-f]{6}$/i),
    fontSize: z.number().min(12).max(17),
  }),
})
export type ResumeDocument = z.infer<typeof resumeSchema>
export type Entry = z.infer<typeof entrySchema>
export type Project = z.infer<typeof projectSchema>
export type Job = z.infer<typeof jobSchema>
export const newEntry = (): Entry => ({
  id: crypto.randomUUID(),
  title: '',
  subtitle: '',
  period: '',
  description: '',
})
export const newProject = (): Project => ({ ...newEntry(), tags: '', url: '' })
export const newJob = (): Job => ({ ...newEntry(), projects: [] })

export function parseBackup(source: string): ResumeDocument {
  if (source.length > 8_000_000) throw new Error('备份文件过大，请选择 8 MB 以内的文件。')
  const result = resumeSchema.safeParse(JSON.parse(source))
  if (!result.success) throw new Error('备份格式或版本不受支持，当前简历未被修改。')
  const document = result.data
  const ids = [
    ...document.education,
    ...document.work,
    ...document.projects,
    ...document.work.flatMap((job) => job.projects),
  ].map((item) => item.id)
  if (new Set(ids).size !== ids.length) throw new Error('备份中存在重复条目，当前简历未被修改。')
  return document
}
