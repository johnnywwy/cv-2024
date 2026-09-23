// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import source from '../src/data/resume.json'
import { parseBackup, resumeSchema } from '../src/types/resume'
import { renderMarkdown, exportMarkdown, safeUrl } from '../src/lib/markdown'
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'

describe('resume backups', () => {
  it('round trips the full latest resume and settings', () => {
    expect(parseBackup(JSON.stringify(source))).toEqual(source)
    expect(source.work.map((job) => job.title)).toEqual([
      '中软国际',
      '珠海爱蒲京软件',
      '广州华夏汇海科技有限公司',
    ])
    expect(source.work[0].projects[0].description).toContain('Medication')
    expect(source.work[0].projects[0].description).toContain('4 类数据转换')
  })
  it('rejects incompatible, broken, duplicate and malicious backup data', () => {
    expect(() => parseBackup('{')).toThrow()
    expect(() => parseBackup(JSON.stringify({ ...source, version: 2 }))).toThrow()
    expect(() =>
      parseBackup(
        JSON.stringify({ ...source, education: [source.education[0], source.education[0]] }),
      ),
    ).toThrow()
    expect(() =>
      parseBackup(
        JSON.stringify({
          ...source,
          profile: { ...source.profile, avatar: 'javascript:alert(1)' },
        }),
      ),
    ).toThrow()
    expect(() =>
      parseBackup(JSON.stringify({ ...source, appearance: { color: 'url(evil)', fontSize: 200 } })),
    ).toThrow()
  })
})

describe('Markdown safety and export', () => {
  it('renders supported formatting while dropping HTML and unsafe links', () => {
    const html = renderMarkdown(
      '**加粗**\n\n1. 项目\n\n[安全](https://example.com)\n\n[坏链接](javascript:alert(1))\n\n<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>',
    )
    expect(html).toContain('<strong>加粗</strong>')
    expect(html).toContain('<ol>')
    expect(html).not.toMatch(/<script|<img|href="javascript:|onerror=/)
    expect(safeUrl('javascript:alert(1)')).toBeUndefined()
  })
  it('exports all sections and nested projects without including photo data', () => {
    const output = exportMarkdown(resumeSchema.parse(source))
    for (const title of [
      '中软国际',
      '珠海爱蒲京软件',
      '校园智慧跳绳小程序',
      '会议室在线预约系统',
      '技能',
      '五邑大学',
    ])
      expect(output).toContain(title)
    expect(output).not.toContain('data:image')
    expect(output).toContain('https://github.com/johnnywwy/nest-study')
  })
  it('keeps supported formats through rich text / Markdown round trips', () => {
    const initial =
      '### 项目\n\n**加粗** 和 *斜体*\n\n1. 第一项\n2. 第二项\n\n- 技能\n\n> 引用\n\n[链接](https://example.com)'
    const editor = new Editor({
      extensions: [StarterKit, Markdown],
      content: renderMarkdown(initial),
    })
    const exported = editor.getMarkdown()
    editor.commands.setContent(renderMarkdown(exported), { emitUpdate: false })
    const html = editor.getHTML()
    for (const tag of [
      '<h3>',
      '<strong>',
      '<em>',
      '<ol>',
      '<ul>',
      '<blockquote>',
      'href="https://example.com"',
    ])
      expect(html).toContain(tag)
    expect(editor.getText()).toContain('第二项')
    editor.destroy()
  })
})
