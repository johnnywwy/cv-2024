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

export function mergeShsopWorkHistory(source: ResumeDocument): ResumeDocument {
  const document = JSON.parse(JSON.stringify(source)) as ResumeDocument
  const normalizeText = (value: string) => value.replace(/,/g, '，')
  document.skills = normalizeText(document.skills)
  for (const entry of document.education) {
    entry.description = normalizeText(entry.description)
  }
  for (const entry of document.projects) {
    entry.description = normalizeText(entry.description)
    entry.tags = normalizeText(entry.tags)
  }
  for (const job of document.work) {
    job.description = normalizeText(job.description)
    for (const project of job.projects) {
      project.description = normalizeText(project.description)
      project.tags = normalizeText(project.tags)
    }
  }
  const current = document.work.find((job) => job.id === 'job-chinasoft')
  const previous = document.work.find((job) => job.id === 'job-zhuhai')
  if (!current) return document
  const currentProject = current.projects.find((project) => project.title === 'SHSOP')
  if (!previous) {
    if (currentProject) currentProject.period = ''
    return document
  }
  const previousProject = previous.projects.find((project) => project.title === 'SHSOP')
  if (currentProject && previousProject) {
    currentProject.period = ''
    currentProject.tags = [
      ...new Set(
        `${previousProject.tags}, ${currentProject.tags}`
          .split(/[,，]/)
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ].join('，')
    const workContent = `**工作内容**\n\n1. 负责 Clinical Help Profile、CDM FE / BE 与 Medication 模块的端到端交付，拆解临床业务规则并完成前端交互、BFF 编排、NestJS 接口和数据模型的闭环实现。\n\n2. 将 CDF 多版本表单中的字段、校验、联动和状态流转抽象为可配置规则，隔离版本差异，避免业务逻辑在页面组件中重复分支。\n\n3. 设计跨版本历史数据的转换与复制流程，覆盖 4 类数据迁移场景，处理字段映射、默认值、关联关系和异常回退，保证旧记录能够在新版本表单中稳定复用。\n\n4. 梳理 Clinical、Referral、Enrol 与 Participant 之间的状态依赖和接口契约，统一前端、BFF 与微服务的数据口径，解决异步初始化、重复请求和跨系统状态不一致问题。\n\n5. 针对多条数据的新增、删除、修改和复制场景，优化局部更新、精细化订阅、缓存复用和请求合并，降低复杂表单的重复渲染与无效请求。\n\n6. 建立从异常数据复现、边界场景定位到 UAT 验证的排查链路，沉淀可复用的问题定位方法，减少跨团队联调中的反复沟通成本。`
    currentProject.description = currentProject.description.replace(
      /\*\*工作内容\*\*[\s\S]*?\n\n\*\*项目亮点\*\*/,
      `${workContent}\n\n**项目亮点**`,
    )
  }
  current.title = '中软国际 / 珠海爱蒲京软件'
  current.subtitle = '全栈开发工程师'
  current.period = '2024 年 10 月 ~ 至今'
  document.work = document.work.filter((job) => job.id !== 'job-zhuhai')
  return document
}

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
  return mergeShsopWorkHistory(document)
}
