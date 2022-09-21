import type { App } from 'vue';
import { createPinia } from 'pinia';

// 创建 store
const store = createPinia();

export function setupStore(app: App<Element>) {
  // 安装到Vue实例
  app.use(store);
}

export { store };
