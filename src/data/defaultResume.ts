import source from './resume.json'
import avatar from '../assets/wwy.jpg'
import { mergeShsopWorkHistory, resumeSchema, type ResumeDocument } from '../types/resume'
import { normalizePhoto } from '../lib/files'

/** Seed only on first use or an explicit reset; never overwrite a saved draft. */
export function createDefaultResume(): ResumeDocument {
  return mergeShsopWorkHistory(resumeSchema.parse(structuredClone(source)))
}
export async function loadDefaultResume(): Promise<ResumeDocument> {
  const resume = createDefaultResume()
  const response = await fetch(avatar)
  if (!response.ok) throw new Error('默认头像读取失败，请重试。')
  resume.profile.avatar = await normalizePhoto(await response.blob())
  return resume
}
