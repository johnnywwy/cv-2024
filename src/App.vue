<template>
  <article>
    <!-- 个人信息 -->
    <section class="bio">
      <h1>吴文宇</h1>
      <img src="./assets/wwy.jpg" alt="" style="width: 100px; height: 100px" />
      <p>男 | 27岁 | 前端开发工程师</p>
      <p>
        手机：<a href="tel:15622178416">15622178416</a> | 邮箱：<a href="mailto:johnnywwy@163.com">johnnywwy@163.com</a>|
        微信：johnnywwy
      </p>
      <div style="height: 10px"></div>
    </section>

    <!-- 教育经历 -->
    <!-- <section class="education">
      <h2>教育经历</h2>
      <p>五邑大学 电子信息专业 本科</p>
      <div style="height: 10px"></div>
    </section> -->

    <!-- 工作经历 -->
    <section class="work">
      <h2 class="title underline">工作经历</h2>
      <ol>
        <li>
          <header style="margin-bottom: 12px">
            <h3 style="font-size: 22px;">广州华夏汇海科技有限公司</h3>
            <span>2020 年 12 月 ~ 至今</span>
          </header>
          <main>
            <!-- 项目1 -->
            <h3 style="margin-bottom: 8px;font-size: 18px;">校园智慧跳绳平台</h3>
            <div style="margin-bottom: 8px">
              <span class="tag">React</span>
              <span class="tag">Ant Design</span>
              <span class="tag">react-router-dom</span>
              <span class="tag">Axios</span>
              <span class="tag">Redux</span>
              <span class="tag">Vite</span>
              <span class="tag">Websocket</span>
            </div>
            <div class="content">
              <p>
                <b>项目描述</b>：
                与公司智能跳绳相结合，面向中小学师生，针对校园跳绳场景，集跳绳管理、作业、比赛、课堂、产品管理、物联网卡跟踪等，共计15个模块，帮助学生提升跳绳技能、监测体育锻炼状况，并为教师提供便捷的管理和数据分析工具
              </p>
              <p>
                <b>工作内容</b>
              <div style="margin-left: 1em">
                <p>
                  1. 从零开始进行项目调研，搭建了基于 React
                  的前端架构，确定了整体的技术栈，包括 <strong>React hooks、Redux、React Router</strong>
                  等核心技术，确保了项目的技术选型与业务需求的紧密结合。
                </p>
                <p>
                  2. 实现动态路由和按钮级别权限控制功能，React 的<strong>组件化</strong>思想和 Redux
                  状态管理库
                </p>
                <p>
                  3.
                  针对项目进行优化，提升平台性能与用户满意度，并顺利完成项目的上线工作
                </p>
              </div>
              </p>
              <p>
                <b>项目难点</b>
              <div style="margin-left: 1em">
                <p>
                  1. <b>WebSocket
                    实时通信</b>：与智能跳绳设备实时连接，确保数据同步和展示。具备<strong>自动重连</strong>、<strong>心跳检测</strong>功能，提升连接稳定性和数据传输可靠性
                </p>
                <p>
                  2. <b>解析
                    Excel</b>：根据业务需求，封装了通用 Excel 文件转 JSON
                  的导入组件，并发布到公司npm私有源供团队各个项目中使用。该组件支持高度自定义和数据处理功能，包括可<strong>根据字典配置自动映射相关数据</strong>，<strong>支持分页上传</strong>、<strong>自动表头匹配</strong>、<strong>数据校验与错误提示</strong>、显著提升了数据导入的效率和准确性。
                </p>
                <p>
                  3. <b>数据可视化分析</b>： 利用 ECharts 提供多种图表和可视化组件，将跳绳数据和运动表现通过直观的图表展示，通过时间轴功能展示历史数据，方便用户追踪和回顾长期运动表现及成绩变化。
                </p>
                <p>
                  4.
                  <b>权限管理</b>：实现<strong>权限管理</strong>，包括对<strong>用户管理</strong>、<strong>角色管理</strong>与<strong>菜单管理</strong>，使用户权限精确到按钮级别
                </p>
              </div>
              </p>


            </div>


            <br />

            <!-- 项目2 -->
            <h3 style="margin-bottom: 8px; font-size: 18px;">智慧体育云平台</h3>
            <div style="margin-bottom: 8px">
              <span class="tag">React</span>
              <span class="tag">Ant Design</span>
              <span class="tag">react-router-dom</span>
              <span class="tag">Axios</span>
              <span class="tag">Redux</span>
              <span class="tag">Vite</span>
              <span class="tag">Tailwindcss</span>
            </div>
            <div class="content">
              <p>
                <b>项目描述</b>：
                一款涉及体测、抽测、视力、竞赛、体检等5大模块的应用。并将原有的基于 .net 开发的 C/S 客户端架构迁移至 B/S 架构
              </p>
              <p>
                <b>工作内容</b>
              <div style="margin-left: 1em">
                <p>
                  1. 使用Vite搭建项目框架，了解原有 C/S 业务功能，使用 React 框架对原业务进行重构，罗列梳理B/S端无法实现的功能，并提供解决方案。
                </p>

              </div>
              </p>
              <p>
                <b>项目亮点</b>
              <div style="margin-left: 1em">
                <p>
                  1. <b>前端工程化</b>：通过 <strong>Vite</strong> 构建工具提升项目的开发和构建效率，优化了热更新速度并减少了打包体积。同时，使用
                  <strong>ESLint</strong>、<strong>Prettier</strong> 和
                  <strong>Husky</strong>
                  实现代码规范化管理，确保团队协作中的代码质量和一致性
                </p>
                <p>
                  2. <b>Node.js采集中转服务</b>：由于架构迁移，浏览器安全策略问题，导致新架构无法对接公司旧设备 WIFI 采集相关功能，使用<strong>Node.js</strong>
                  编写服务，并对外暴露端口，搜索并获取采集设备相关数据，并实时推送至前端
                </p>
                <p>
                  3. <b>文件上传组件</b>： 支持图片、文件上传，并集成了文件预览和多图上传功能，并上传至<strong>阿里云OSS</strong>，解决了文件上传与图片管理的复杂场景
                </p>
              </div>
              </p>
              <br />
            </div>

            <!-- 项目3 -->
            <h3 style="margin-bottom: 8px ;font-size: 18px;">校园智慧跳绳小程序</h3>
            <div style="margin-bottom: 8px">
              <span class="tag">Vue3</span>
              <span class="tag">Uniapp</span>
              <span class="tag">uview plus</span>
              <span class="tag">WebSocket</span>
              <span class="tag">pnpm</span>
              <span class="tag">Vite</span>
              <span class="tag">Unocss</span>
            </div>
            <div class="content">
              <p>
                <b>项目描述</b>：
                结合智慧校园跳绳平台，家长和学生可以在小程序上完成老师布置的作业，查看自己的运动记录和平时的自我锻炼。老师使用可以在课堂上发起快速比赛、训练等
              </p>
              <p>
                <b>工作内容</b>
              <div style="margin-left: 1em">
                <p>
                  1. 独立实现小程序<strong>从0到1</strong>的申请、审批、开发、测试、上线以及后续维护全流程
                </p>
                <p>
                  2. 根据UI提供的设计规范，完成负责前端项目日常需求开发
                </p>
              </div>
              </p>
              <p>
                <b>项目亮点</b>
              <div style="margin-left: 1em">
                <p>
                  1. 独立实现使用 <strong>vite 搭建</strong> uniapp 开发平台，引入 <strong>Unocss 原子化</strong> css，并在公司内推广使用
                </p>
                <p>
                  2. 封装通用 Axios 请求，支持<strong>全局异常拦截</strong>、错误处理及请求头配置，提升了 API 请求管理的统一性和可维护性
                </p>
                <p>
                  3. 通过 <strong>WebSocket</strong>
                  私有协议实现在小程序上<strong>连接</strong>并<strong>控制</strong>智能跳绳设备，并实时获取跳绳数据
                </p>
              </div>
              </p>
            </div>
          </main>
        </li>
      </ol>
      <!-- <div style="height: 10px"></div> -->
    </section>



    <!-- 项目经历 -->
    <section class="projects">
      <h2 class="title underline">个人项目</h2>
      <ol>
        <li>
          <header>
            <h3 style="margin-bottom: 8px ;font-size: 18px;">会议室在线预约系统</h3>
            <span>
              <a href="https://github.com/johnnywwy/nest-study">源码链接</a>
            </span>
          </header>
          <div style="margin-bottom: 8px">
            <span class="tag">React</span>
            <span class="tag">Ant Design</span>
            <span class="tag">pnpm</span>
            <span class="tag">Vite</span>
            <span class="tag">NestJS</span>
            <span class="tag">Mysql</span>
            <span class="tag">Redis</span>
          </div>
          <div class="content">
            <p>
              <b>项目描述</b>：
              一款基于 web 端的会议室预约系统，含有管理端和客户端。使用 NestJS + Mysql + Redis 实现后端业务，使用 React 实现前端场景。
            </p>
            <p>
              <b>工作内容</b>
            <div style="margin-left: 1em">
              <p>
                1.
                <strong>从0到1实现</strong>，在私有Linux设备上部署<strong>Docker</strong>，<strong>Mysql</strong>，<strong>Redis</strong>等所需技术。了解
                DockerFile 编写流程
              </p>
              <p>
                2. 实现基于 <strong>RBAC</strong> 的角色权限控制，使用 <strong>JWT</strong> 作为系统验证登录方式，配合个人 163 邮箱实现登录验证
              </p>
              <p>
                3. 使用 <strong>RESTful Api</strong> 进行接口规范化开发，并引入ApiFox 等工具完成接口初步调试
              </p>
            </div>
            </p>
          </div>
        </li>
        <li>
          <header>
            <h3>咕噜 UI</h3>
            <span>
              <a href="https://github.com/johnnywwy/gulu-ui" style="margin-right: 5px;">源码链接</a>
              <a href="https://johnnywwy.gitee.io/gulu-ui-website/#/">项目预览</a>
            </span>
          </header>
          <p>
            一款基于
            <strong>Vue3 </strong>/ <strong>TypeScript </strong>/
            <strong>Vite </strong> 的 UI 框架
          </p>
          <p>
            目前UI组件有
            <strong>Button组件</strong>、 <strong>Switch组件</strong>、
            <strong>Dialog组件</strong>、
            <strong>Tabs组件</strong>
          </p>
          <p>除了学习之外，主要目的是希望在工作中能够加以复用，提高开发效率</p>
          <p>
            制作过程让我对 Vue3 有了新的认识，并且分别对移动端和 PC
            端进行适配，提升用户使用体验
          </p>
          <p>
            并将整个项目的学习过程总结成了一篇博客《<a href="https://baidu.com">Vue3 造轮子实录</a>》
          </p>
          <p></p>
          <p></p>
        </li>
        <!-- <li>
          <header>
            <h3>云笔记</h3>
            <span>
              <a href="https://baidu.com">源码链接</a>
              <a href="https://baidu.com">项目预览</a>
            </span>
          </header>
          <p>
            一款基于 <strong>Vue2</strong> / <strong>Vuex</strong> /
            <strong>Element-ui</strong> 的 PC 版云笔记
          </p>
          <p>
            主要功能：用户登录与注册，对笔记本进行增删改查等操作，对markdown格式进行渲染
          </p>
          <p>
            制作过程让我对<strong>后端交互</strong>有了更深刻的理解，掌握了 Vuex
            状态管理的使用，<strong>接口的封装</strong>，增强可复用性。
            并将整个项目的学习过程总结成了一篇博客《<a href="https://baidu.com">云笔记开发实录</a>》
          </p>
          <p></p>
          <p></p>
        </li> -->
        <!-- <li>
          <header>
            <h3>大屏可视化</h3>
            <span>
              <a href="https://baidu.com">源码链接</a>
              <a href="https://baidu.com">项目预览</a>
            </span>
          </header>
          <p>
            一款基于
            <strong>Vue </strong>/
            <strong>Echarts </strong>
            的大屏可视化项目
          </p>
          <p>
            为了适应所有屏幕，我使用了动态
            <strong>rem</strong> 方案，具体思路见我的博客《<a href="https://baidu.com">大屏项目实战</a>》
          </p>

          <p>
            这个项目是我在学习前端可视化与 echarts 时制作而成，页面布局使用了
            <strong>Grid</strong> 和 <strong>Flex</strong> 布局
          </p>

          <p>
            项目中包含的图例有柱形图、折线图、饼图、地图和表格等，图例都可以实时更新数据并辅以动画交互
          </p>
          <p>通过这个项目，我掌握了大屏可视化项目的制作技巧</p>
        </li> -->
        <!-- <li>
          <header>
            <h3>旺财记账</h3>
            <span>
              <a href="https://baidu.com">源码链接</a>
              <a href="https://baidu.com">项目预览</a>
            </span>
          </header>
          <p>
            一个基于 <strong>Vue</strong> /
            <strong>TypeScript</strong> 的移动端单页面应用
          </p>
          <p>
            该项目使用 <strong>VueRouter</strong> 的 Hash
            模式来实现不同页面的跳转
          </p>
          <p>
            使用 <strong>Flex</strong> 布局来达到响应式布局，使用
            <strong>Vuex</strong> 来进行全局数据管理
          </p>
          <p>这是我从自己的需求出发，设计出的极简记账应用，特点是快速记账</p>
          <p></p>
        </li> -->
      </ol>
      <div style="height: 10px"></div>
    </section>


    <!-- 专业技能 -->
    <section class="skills">
      <h2 class="title underline">技能</h2>
      <div class="wrapper">
        <ul>
          <li>熟悉页面制作技巧，能将设计稿<strong>1:1还原</strong></li>
          <li>
            熟悉<strong>前后端分离</strong>技术，包括
            AJAX、跨域、前端路由、Cookie、Session 等
          </li>
          <li>
            熟悉<strong>Nest.js</strong>技术，能快速搭建后台项目
          </li>
          <li>
            熟练掌握 <strong>Vue全家桶</strong>的使用，包括
            VueCli、VueRouter、Vuex 等
          </li>
          <!-- <li>熟悉 ES6，包括 let / Promise / await / 析构赋值</li> -->
          <li>
            了解 <strong>TypeScript</strong> 的使用，我的项目就是 TS 实现的
          </li>
          <li>了解 <strong>Docker 的使用，熟悉 Dockerfile 编写</strong>
            并搭建了一个基于docker的 <span>
              <a href="https://github.com/johnnywwy/oh-my-front-env">前端开发环境</a>
            </span>

          </li>
          <li>熟练使用 VS code、WebStorm 等开发工具</li>
        </ul>
      </div>
      <div style="height: 10px"></div>
    </section>
  </article>
</template>

<script setup></script>

<style scoped>
@import "app.module.scss";
</style>
