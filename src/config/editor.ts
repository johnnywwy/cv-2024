import type { Entry, Job, Project, ResumeDocument } from '../types/resume'
export type FieldDefinition<T> = {
  key: { [K in keyof T]: T[K] extends string ? K : never }[keyof T] & string
  label: string
  placeholder?: string
  type?: string
}
export const editorSections = [
  { id: 'profile', title: '基本信息', icon: 'person', hint: '让招聘者快速认识你。' },
  { id: 'education', title: '教育经历', icon: 'education', hint: '填写学校、专业与教育背景。' },
  { id: 'work', title: '工作经历', icon: 'work', hint: '用具体的工作与成果，呈现你的经验。' },
  { id: 'projects', title: '个人项目', icon: 'project', hint: '展示那些值得被看见的作品。' },
  { id: 'skills', title: '专业技能', icon: 'skills', hint: '突出与你的目标岗位相关的能力。' },
  { id: 'appearance', title: '排版设置', icon: 'settings', hint: '调整细节，让内容更容易阅读。' },
] as const
export type EditorSection = (typeof editorSections)[number]['id']
export const profileFields: FieldDefinition<ResumeDocument['profile']>[] = [
  { key: 'name', label: '姓名', placeholder: '你的姓名' },
  { key: 'role', label: '求职意向', placeholder: '例如：全栈开发工程师' },
  { key: 'gender', label: '性别（选填）' },
  { key: 'age', label: '年龄（选填）' },
  { key: 'phone', label: '手机', type: 'tel' },
  { key: 'email', label: '邮箱', type: 'email' },
  { key: 'wechat', label: '微信（选填）' },
  { key: 'location', label: '所在城市（选填）' },
]
export const educationFields: FieldDefinition<Entry>[] = [
  { key: 'title', label: '学校' },
  { key: 'subtitle', label: '专业与学历' },
  { key: 'period', label: '就读时间（选填）' },
]
export const workFields: FieldDefinition<Job>[] = [
  { key: 'title', label: '公司名称' },
  { key: 'subtitle', label: '职位（选填）' },
  { key: 'period', label: '任职时间', placeholder: '2025 年 12 月 ~ 至今' },
]
export const projectFields: FieldDefinition<Project>[] = [
  { key: 'title', label: '项目名称', placeholder: '例如：智慧体育云平台' },
  { key: 'subtitle', label: '担任角色（选填）' },
  { key: 'period', label: '项目时间（选填）' },
  { key: 'tags', label: '技术栈（用逗号分隔）', placeholder: 'Vue 3, TypeScript, Tailwind CSS' },
  { key: 'url', label: '项目链接（选填）', placeholder: 'https://' },
]
