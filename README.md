# SvelteKit Wrapper

<div align="center">

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF5E5B?style=for-the-badge&logo=svelte&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**SvelteKit Wrapper** — The fastest full-stack framework for JavaScript and TypeScript, wrapped for easy integration.

[English](#english) · [中文](#中文)

</div>

---

## English

### What is SvelteKit?

[SvelteKit](https://github.com/sveltejs/kit) is a framework for building web applications with Svelte — a radical new approach to UI development. It provides server-side rendering, routing, hot module replacement, and a full-stack development experience.

### Why SvelteKit?

- **Blazing fast** — Svelte compiles away the framework overhead, leaving minimal vanilla JS
- **Server-side rendering** — Out-of-the-box SSR/SSG for maximum performance and SEO
- **File-based routing** — Intuitive file-system routing with layouts, nested routes, and dynamic segments
- **Full-stack** — Load data server-side, handle forms, manage sessions — all in one framework
- **Adaptable** — Deploy anywhere: Node.js, Vercel, Netlify, Cloudflare Workers, Deno, and more
- **HMR** — Hot module replacement keeps your development experience fast and fluid

### Features

| Feature | Description |
|---------|-------------|
| SSR/SSG | Server-side rendering and static site generation |
| File Routing | Intuitive filesystem-based routing |
| API Routes | Build API endpoints alongside your pages |
| Form Actions | Progressive enhancement for forms |
| Data Loading | Load data in `+page.server.js` or `+layout.server.js` |
| TypeScript | First-class TypeScript support |
| Prerendering | Static site generation at build time |
| Edge Functions | Deploy to Cloudflare Workers, Vercel Edge, etc. |

### Installation

```bash
# Create a new project
npm create svelte@latest my-app

# Or use the skeleton
npm create svelte@latest my-app -- --template skeleton

# Install dependencies
cd my-app
npm install

# Start development server
npm run dev
```

### Quick Start

```bash
# Interactive setup (recommended)
npm create svelte@latest my-app
# Choose: Skeleton project, TypeScript, ESLint, Prettier

cd my-app
npm install
npm run dev
```

### Project Structure

```
my-app/
├── src/
│   ├── routes/
│   │   ├── +page.svelte       # Home page
│   │   ├── +layout.svelte     # Shared layout
│   │   ├── +page.server.js    # Server-side data loading
│   │   └── about/
│   │       └── +page.svelte   # /about
│   └── lib/
│       └── components/         # Reusable components
├── static/
│   └── favicon.png
├── svelte.config.js
├── vite.config.js
├── package.json
└── tsconfig.json
```

### Basic Page Example

**`src/routes/+page.svelte`**
```svelte
<script>
  export let data;
</script>

<h1>Welcome to SvelteKit!</h1>
<p>Data from server: {data.message}</p>
```

**`src/routes/+page.server.js`**
```javascript
export async function load() {
  return {
    message: 'Hello from the server!'
  };
}
```

### API Route Example

**`src/routes/api/hello/+server.js`**
```javascript
export async function GET({ url }) {
  const name = url.searchParams.get('name') ?? 'World';
  return new Response(JSON.stringify({ greeting: `Hello, ${name}!` }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Deployment Adapters

SvelteKit supports multiple deployment targets via adapters:

```bash
# Node.js server
npm i -D @sveltejs/adapter-node

# Vercel
npm i -D @sveltejs/adapter-vercel

# Netlify
npm i -D @sveltejs/adapter-netlify

# Cloudflare Workers
npm i -D @sveltejs/adapter-cloudflare

# Static site (Vite static)
npm i -D @sveltejs/adapter-static
```

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=sveltejs/kit&type=Timeline)](https://star-history.com/#sveltejs/kit&Timeline)

---

## 中文

### 什么是 SvelteKit？

[SvelteKit](https://github.com/sveltejs/kit) 是一个用于构建 Web 应用的框架，基于 Svelte —— 一种颠覆性的 UI 开发新方式。它提供服务端渲染、路由、热模块替换，以及全栈开发体验。

### 为什么选择 SvelteKit？

- ⚡ **极致性能** — Svelte 在编译时消除框架开销，输出极简原生 JS
- 🌐 **开箱即用的 SSR/SSG** — 服务端渲染和静态站点生成，最大化性能与 SEO
- 📁 **文件系统路由** — 直观的基于文件系统的路由，支持布局、嵌套路由、动态参数
- 🏗️ **全栈能力** — 在服务端加载数据、处理表单、管理会话，一站式搞定
- 🚀 **部署灵活** — 支持 Node.js、Vercel、Netlify、Cloudflare Workers、Deno 等
- 🔥 **热模块替换** — 开发时即时预览，保持流畅的开发体验

### 核心特性

| 特性 | 说明 |
|------|------|
| SSR/SSG | 服务端渲染与静态站点生成 |
| 文件路由 | 基于文件系统的直观路由 |
| API 路由 | 与页面共存的后端接口 |
| 表单行为 | 表单的渐进式增强 |
| 数据加载 | 在 `+page.server.js` 或 `+layout.server.js` 中加载数据 |
| TypeScript | 一等公民的 TypeScript 支持 |
| 预渲染 | 构建时静态站点生成 |
| Edge 函数 | 部署到 Cloudflare Workers、Vercel Edge 等 |

### 快速开始

```bash
# 方式一：交互式创建（推荐）
npm create svelte@latest my-app
# 按提示选择：骨架项目、TypeScript、ESLint、Prettier

cd my-app
npm install
npm run dev
```

### 项目结构

```
my-app/
├── src/
│   ├── routes/
│   │   ├── +page.svelte       # 首页
│   │   ├── +layout.svelte     # 共享布局
│   │   ├── +page.server.js    # 服务端数据加载
│   │   └── about/
│   │       └── +page.svelte   # /about 页面
│   └── lib/
│       └── components/         # 可复用组件
├── static/
│   └── favicon.png
├── svelte.config.js
├── vite.config.js
├── package.json
└── tsconfig.json
```

### 基础页面示例

**`src/routes/+page.svelte`**
```svelte
<script>
  export let data;
</script>

<h1>欢迎使用 SvelteKit！</h1>
<p>来自服务端的数据：{data.message}</p>
```

**`src/routes/+page.server.js`**
```javascript
export async function load() {
  return {
    message: '你好，来自服务端！'
  };
}
```

### API 路由示例

**`src/routes/api/hello/+server.js`**
```javascript
export async function GET({ url }) {
  const name = url.searchParams.get('name') ?? '世界';
  return new Response(JSON.stringify({ greeting: `你好，${name}！` }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### 部署适配器

SvelteKit 通过适配器支持多种部署目标：

```bash
# Node.js 服务器
npm i -D @sveltejs/adapter-node

# Vercel
npm i -D @sveltejs/adapter-vercel

# Netlify
npm i -D @sveltejs/adapter-netlify

# Cloudflare Workers
npm i -D @sveltejs/adapter-cloudflare

# 静态站点
npm i -D @sveltejs/adapter-static
```

### 贡献者

[![Star History](https://api.star-history.com/svg?repos=sveltejs/kit&type=Timeline)](https://star-history.com/#sveltejs/kit&Timeline)

---

## License

MIT © [SvelteKit](https://github.com/sveltejs/kit) — This is a wrapper project, not affiliated with the official SvelteKit repository.