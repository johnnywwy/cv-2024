import type { ResumeVariant } from '../types/workspace'
import { cloneResume } from '../types/workspace'
import type { ResumeDocument } from '../types/resume'

/** One projection shared by preview and exports; originals remain editable. */
export function projectResume(variant: ResumeVariant): ResumeDocument {
  const document = cloneResume(variant.resume)
  if (variant.kind === 'base') return document
  const hidden = new Set(variant.hiddenEntryIds)
  document.education = document.education.filter((item) => !hidden.has(item.id))
  document.work = document.work
    .filter((item) => !hidden.has(item.id))
    .map((job) => ({ ...job, projects: job.projects.filter((project) => !hidden.has(project.id)) }))
  document.projects = document.projects.filter((item) => !hidden.has(item.id))
  return document
}
export function variantFilename(variant: ResumeVariant): string {
  return [
    variant.resume.profile.name || '简历',
    variant.kind === 'target' ? variant.name : '基础简历',
  ].join('-')
}
