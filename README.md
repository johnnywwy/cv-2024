# 简历工坊 · Resume Studio

基于 Vue 3、TypeScript、Vite 和 Tailwind CSS 4 的纯前端简历编辑工具。默认简历内容依据仓库中的《吴文宇(1).pdf》，仅首次使用或明确重置时加载。

## 本地开发

建议 Node.js 22.12+，使用 pnpm：

```sh
pnpm install
pnpm dev
```

打开终端显示的地址下的 `/cv-wwy/`。`pnpm build` 生成 `dist/`，`pnpm preview` 验证构建产物。部署路径由 `vite.config.js` 中的 `base` 控制，当前保留 `/cv-wwy/`；部署至域名根路径时改为 `/`。

## 使用

- 在基本信息、教育、工作、个人项目和技能之间切换；条目支持新增、删除与上下调整。
- 描述默认可视化编辑，支持格式按钮、撤销及 Markdown 源码切换。支持段落、标题、粗体、斜体、有序/无序列表、链接和引用；不支持任意 HTML、图片及表格。源码切换不会立即改写原文本，但编辑可视化内容后会规范化 Markdown，未支持的结构无法保证保留。
- 右侧是连续 A4 宽度预览，移动端通过按钮切换预览。打印会自动分页，连续预览不显示准确页边界。
- “导出 PDF”打开系统打印对话框，选择“另存为 PDF”、A4、100% 缩放，关闭浏览器页眉页脚。
- 文件菜单可导出完整 JSON 备份、恢复备份、导出 Markdown 或恢复默认简历。Markdown 用于阅读与分享，恢复完整编辑状态请使用 JSON。
- 头像支持 JPG、PNG、WebP，最大 2 MB；支持隐藏头像、调整主题色与字号。

## 保存与隐私

内容只保存于当前浏览器、当前网站来源的 IndexedDB，无账号、无服务端上传。自动保存有 250 ms 防抖，界面会显示保存状态；请在状态显示已保存后关闭页面。更换设备、清理浏览器或使用隐私模式可能丢失草稿，请定期导出 JSON 备份。数据读取异常时停止自动覆盖旧数据，只有用户明确导入或重置后才恢复写入。备份格式带 `version`，不兼容或损坏的文件会被拒绝。

默认简历作为前端静态资源随站点发布，包含简历中的姓名、联系方式和头像。部署后任何访问者均可加载这些默认内容。

## 工程结构

- `src/App.vue`：页面组件组合与状态连接，不承载章节表单或导入导出细节。
- `src/components/workbench/`：工具栏、文件菜单与移动端导航，只处理界面交互。
- `src/components/editor/`：个人信息、教育、工作、项目、排版等业务章节；`EntryCollection` 统一条目循环、排序和删除入口，`FieldGroup` 根据字段配置生成表单。公司内项目和个人项目复用同一个 `ProjectsEditor`。
- `src/components/preview/`：简历正文、个人信息头部、通用章节和经历列表；`MarkdownContent` 统一安全渲染入口，预览外壳只负责缩放和纸张布局。
- `src/config/editor.ts`：章节导航和强类型字段配置，新增字段的标签、提示及输入类型集中维护。
- `src/types/resume.ts`：Zod 数据校验、类型和条目工厂。
- `src/composables/useResume.ts`：自动保存、初始化与替换。
- `src/composables/useResumeFiles.ts`：备份、导入、重置和导出业务。
- `src/composables/useEntryCollection.ts`：可复用的新增、移动和删除操作。
- `src/lib/`：Markdown 安全渲染、导出、文件和头像处理。
- `src/data/`：PDF 整理后的默认简历。
- `src/style.css`：Tailwind 入口、少量复用控件样式；`src/styles/resume.css`：正文排版、富文本与打印规则。

不再依赖 Sass。已有 `*copy*` 备份文件保留但不参与编译、检查或 Tailwind 扫描。没有新增后端或远程接口。

组件边界按业务职责划分：页面 → 章节 → 复用控件。编辑组件通过 `v-model` 接收对应章节数据，预览组件只读 `props`；数据内容保留在 `src/data/`，不再硬编码到模板。原生 `div`、`li` 等标签仍用于必要的语义与布局，但重复结构通过组件和数据循环维护。

## 检查

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
# 或一次运行
pnpm check
```

测试覆盖备份往返、损坏数据、格式版本、危险链接及 HTML、完整 Markdown 导出和富文本格式往返。`pnpm format` 格式化源文件。
