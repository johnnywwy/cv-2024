import { Marked } from 'marked'
import DOMPurify from 'dompurify'
import type { ResumeDocument, Project } from '../types/resume'

const parser = new Marked({ gfm: true, breaks: true, renderer: { html: () => '' } })
export function renderMarkdown(markdown: string): string {
  return DOMPurify.sanitize(parser.parse(markdown, { async: false }), {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      's',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'a',
      'code',
      'pre',
      'hr',
    ],
    ALLOWED_ATTR: ['href', 'title', 'start'],
  })
}
export function safeUrl(value: string): string | undefined {
  try {
    const url = new URL(value)
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : undefined
  } catch {
    return undefined
  }
}
const escape = (value: string) => value.replace(/[\\`*_{}[\]<>#!|]/g, '\\$&').replace(/\n/g, ' ')
function projectMarkdown(project: Project, level: number): string {
  return [
    `${'#'.repeat(level)} ${escape(project.title)}`,
    [project.subtitle, project.period].filter(Boolean).map(escape).join(' · '),
    project.tags ? `技术栈：${escape(project.tags)}` : '',
    safeUrl(project.url) ? `[项目链接](<${safeUrl(project.url)}>)` : '',
    project.description,
  ]
    .filter(Boolean)
    .join('\n\n')
}
export function exportMarkdown(resume: ResumeDocument): string {
  const p = resume.profile
  return (
    [
      `# ${escape(p.name)}`,
      [p.gender, p.age && `${p.age}岁`, p.role, p.location].filter(Boolean).map(escape).join(' | '),
      [
        p.phone && `手机：${p.phone}`,
        p.email && `邮箱：${p.email}`,
        p.wechat && `微信：${p.wechat}`,
      ]
        .filter(Boolean)
        .map(escape)
        .join(' | '),
      resume.education.length ? '## 教育经历' : '',
      ...resume.education.map((e) =>
        [
          `### ${escape(e.title)}`,
          [e.subtitle, e.period].filter(Boolean).map(escape).join(' · '),
          e.description,
        ]
          .filter(Boolean)
          .join('\n\n'),
      ),
      resume.work.length ? '## 工作经历' : '',
      ...resume.work.map((job) =>
        [
          `### ${escape(job.title)}`,
          [job.subtitle, job.period].filter(Boolean).map(escape).join(' · '),
          job.description,
          ...job.projects.map((p) => projectMarkdown(p, 4)),
        ]
          .filter(Boolean)
          .join('\n\n'),
      ),
      resume.projects.length ? '## 个人项目' : '',
      ...resume.projects.map((p) => projectMarkdown(p, 3)),
      resume.skills ? '## 技能' : '',
      resume.skills,
    ]
      .filter(Boolean)
      .join('\n\n') + '\n'
  )
}
