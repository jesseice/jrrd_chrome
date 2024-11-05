# Vue3 + TypeScript + Vite5 + chrome扩展
# 主要插件目录结构
- **public**                    # 静态资源文件夹
  - (放置公共静态资源文件，比如图标或图片等)

- **src**                       # Vue 项目的源代码
  - **crx**                     # Chrome 插件文件夹
    - (放置插件相关文件，根据需求自定义)
    - `side.html`               # 侧边栏 HTML 文件
    - `background.js`           # 后台脚本文件
    - `content.js`              # 内容脚本文件

  - (其余 Vue 组件和文件)
  - `App.vue`
  - `main.js`

- **manifest.json**             # Chrome 插件的配置文件

- **vite.config.js**            # Vite 配置文件
- **package.json**              # 项目依赖配置文件
