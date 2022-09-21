import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes } from './routes';

import type { App } from 'vue';

import 'vue-router';
// 扩展 RouteMeta 接口来输入 meta 字段
declare module 'vue-router' {
  interface RouteMeta {
    icon?: string; // 菜单图标
    title?: string; // 标题
    permissionCode?: string; // 权限标记
    hideMenu?: boolean; // 当前路由不再菜单显示
    hideChildrenInMenu?: boolean; // 当只有一个子路由器时，默认显示子路由器
    target?: string; // 页面跳转方式 '_blank' | '_self'
  }
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
