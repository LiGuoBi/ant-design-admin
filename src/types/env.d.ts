/// <reference types="vite/client" />

// 环境变量类型声明，TypeScript 智能提示
interface ImportMetaEnv {
  // 网站标题
  readonly VITE_APP_TITLE: string;
  // iconfont地址
  readonly VITE_ICONFONT_URL: string;
  // 请求地址
  readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
