/**
 * SvelteKit Wrapper Demo
 * 
 * 本示例展示 SvelteKit 的核心概念和使用方式。
 * 完整项目请参考: https://github.com/sveltejs/kit
 * 
 * This demo illustrates the core concepts of SvelteKit.
 * For the full project, visit: https://github.com/sveltejs/kit
 */

// ============================================================
// 1. 页面路由示例 (Page Routing)
// ============================================================

/**
 * SvelteKit 使用基于文件系统的路由。
 * 文件路径对应 URL 结构：
 * 
 *   src/routes/+page.svelte          → /
 *   src/routes/about/+page.svelte    → /about
 *   src/routes/blog/[slug]/+page.svelte → /blog/:slug
 */

// 示例: src/routes/+page.svelte
const homePageCode = `
<!-- src/routes/+page.svelte -->
<script>
  export let data;
</script>

<h1>欢迎</h1>
<p>{data.welcomeMessage}</p>

<style>
  h1 { color: #ff5e5b; }
</style>
`;

// 示例: src/routes/+page.server.js
const serverLoadCode = `
// src/routes/+page.server.js
export async function load({ cookies, locals }) {
  return {
    welcomeMessage: '你好，SvelteKit！',
    user: locals.user ?? null
  };
}
`;

// ============================================================
// 2. API 路由示例 (API Routes)
// ============================================================

/**
 * 在 src/routes/api 目录下创建文件来定义 API 端点。
 * 文件名决定 HTTP 方法：
 *   +server.js    → 处理请求
 *   GET(), POST(), PUT(), DELETE() 等方法
 */

// 示例: src/routes/api/hello/+server.js
const apiRouteCode = `
// src/routes/api/hello/+server.js
export async function GET({ url }) {
  const name = url.searchParams.get('name') ?? '世界';
  
  return new Response(JSON.stringify({
    greeting: \`你好，\${name}！\`,
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST({ request }) {
  const body = await request.json();
  
  return new Response(JSON.stringify({
    received: body,
    status: 'success'
  }), {
    headers: { 'Content-Type': 'application/json' },
    status: 201
  });
}
`;

// ============================================================
// 3. 表单行为示例 (Form Actions)
// ============================================================

/**
 * SvelteKit 的表单行为（Form Actions）允许你处理表单提交，
 * 同时支持渐进式增强（Progressive Enhancement）。
 */

// 示例: src/routes/contact/+page.svelte
const formPageCode = `
<!-- src/routes/contact/+page.svelte -->
<script>
  import { enhance } from '\\$app/forms';
  
  export let form;
</script>

<form method="POST" use:enhance>
  <input type="text" name="name" placeholder="姓名" required />
  <input type="email" name="email" placeholder="邮箱" required />
  <textarea name="message" placeholder="留言"></textarea>
  <button type="submit">发送</button>
</form>

{#if form?.success}
  <p class="success">发送成功！</p>
{/if}
`;

// 示例: src/routes/contact/+page.server.js
const formActionCode = `
// src/routes/contact/+page.server.js
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    
    // 在此处处理数据（发送邮件、保存到数据库等）
    console.log({ name, email, message });
    
    return { success: true };
  }
};
`;

// ============================================================
// 4. 布局示例 (Layouts)
// ============================================================

/**
 * +layout.svelte 文件定义共享布局，
 * +layout.server.js 用于在所有路由中加载数据。
 */

// 示例: src/routes/+layout.svelte
const layoutCode = `
<!-- src/routes/+layout.svelte -->
<script>
  import Header from '\\$lib/components/Header.svelte';
  export let data;
</script>

<Header user={data.user} />

<main>
  <slot />
</main>

<footer>
  <p>&copy; 2024 My SvelteKit App</p>
</footer>
`;

// 示例: src/routes/+layout.server.js
const layoutServerCode = `
// src/routes/+layout.server.js
export async function load({ locals }) {
  return {
    user: locals.user
  };
}
`;

// ============================================================
// 5. 动态路由示例 (Dynamic Routes)
// ============================================================

/**
 * 使用 [param] 语法定义动态路由参数。
 * 参数值通过 data 或 page.params 获取。
 */

// 示例: src/routes/blog/[slug]/+page.svelte
const dynamicPageCode = `
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.article.title}</h1>
<p>分类: {data.article.category}</p>
<div>{@html data.article.content}</div>
`;

// 示例: src/routes/blog/[slug]/+page.server.js
const dynamicServerCode = `
// src/routes/blog/[slug]/+page.server.js
export async function load({ params }) {
  const { slug } = params;
  
  // 从数据库或 API 获取文章数据
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    throw error(404, '文章未找到');
  }
  
  return { article };
}
`;

// ============================================================
// 6. 错误处理示例 (Error Handling)
// ============================================================

/**
 * +error.svelte 文件自定义错误页面。
 */

// 示例: src/routes/+error.svelte
const errorPageCode = `
<!-- src/routes/+error.svelte -->
<script>
  import { page } from '\\$app/stores';
</script>

<h1>{$page.status} - {$page.error.message}</h1>
<p>抱歉，发生了错误。</p>
<a href="/">返回首页</a>
`;

// ============================================================
// 7. 钩子示例 (Hooks)
// ============================================================

/**
 * src/hooks.server.js 用于在请求生命周期中运行代码，
 * 例如认证、日志、数据库连接等。
 */

// 示例: src/hooks.server.js
const hooksCode = `
// src/hooks.server.js
export async function handle({ event, resolve }) {
  // 在每个请求之前执行
  const token = event.cookies.get('session');
  
  if (token) {
    const user = await validateSession(token);
    event.locals.user = user;
  }
  
  const response = await resolve(event);
  
  return response;
}
`;

// ============================================================
// 8. SvelteKit 配置示例
// ============================================================

// 示例: svelte.config.js
const svelteConfigCode = `
// svelte.config.js
import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      '\\$components': 'src/lib/components',
      '\\$utils': 'src/lib/utils'
    }
  }
};
`;

// 示例: vite.config.js
const viteConfigCode = `
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    strictPort: false
  }
});
`;

// ============================================================
// 打印所有示例
// ============================================================

console.log('='.repeat(60));
console.log('SvelteKit Wrapper Demo');
console.log('='.repeat(60));
console.log();
console.log('仓库地址 / Repository: https://github.com/sveltejs/kit');
console.log('星标数 / Stars: 20,561+');
console.log();
console.log('-'.repeat(60));
console.log('1. 首页示例 (Home Page)');
console.log('-'.repeat(60));
console.log('页面组件:');
console.log(homePageCode);
console.log('服务端加载:');
console.log(serverLoadCode);
console.log();
console.log('-'.repeat(60));
console.log('2. API 路由示例 (API Routes)');
console.log('-'.repeat(60));
console.log(apiRouteCode);
console.log();
console.log('-'.repeat(60));
console.log('3. 表单行为示例 (Form Actions)');
console.log('-'.repeat(60));
console.log('页面:');
console.log(formPageCode);
console.log('服务端:');
console.log(formActionCode);
console.log();
console.log('-'.repeat(60));
console.log('4. 布局示例 (Layouts)');
console.log('-'.repeat(60));
console.log('布局组件:');
console.log(layoutCode);
console.log('布局服务端:');
console.log(layoutServerCode);
console.log();
console.log('-'.repeat(60));
console.log('5. 动态路由示例 (Dynamic Routes)');
console.log('-'.repeat(60));
console.log('页面:');
console.log(dynamicPageCode);
console.log('服务端:');
console.log(dynamicServerCode);
console.log();
console.log('-'.repeat(60));
console.log('6. 错误处理示例 (Error Handling)');
console.log('-'.repeat(60));
console.log(errorPageCode);
console.log();
console.log('-'.repeat(60));
console.log('7. 钩子示例 (Hooks)');
console.log('-'.repeat(60));
console.log(hooksCode);
console.log();
console.log('-'.repeat(60));
console.log('8. 配置文件示例');
console.log('-'.repeat(60));
console.log('svelte.config.js:');
console.log(svelteConfigCode);
console.log('vite.config.js:');
console.log(viteConfigCode);
console.log();
console.log('='.repeat(60));
console.log('快速开始 / Quick Start:');
console.log('='.repeat(60));
console.log(`
# 创建新项目
npm create svelte@latest my-app

# 进入目录
cd my-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
`);
console.log('='.repeat(60));
console.log('END OF DEMO');
console.log('='.repeat(60));