import DefaultLayout from '@/layouts/defaultLayout/DefaultLayout.vue';
// import BlankLayout from '@/layouts/BlankLayout.vue'; // 空白页承载嵌套路由
import ErrorPage from '@/views/ErrorPage.vue';

import type { RouteRecordRaw } from 'vue-router';

// 404
export const notFoundRoutes: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'notFound',
  component: ErrorPage,
  meta: {
    hideMenu: true,
  },
};

/**
 * 基础路由(不验证权限)
 */
export const constantRoutes: RouteRecordRaw[] = [
  /* {
    path: '', // 路由
    name: '', // 路由别名
    meta: {
      icon: '', // 菜单图标
      title: '', // 标题
      hideMenu: false, // 当前路由不再菜单显示
      hideChildrenInMenu: false, // 当只有一个子路由器时，默认显示子路由器
      target: '', // 页面跳转方式 '_blank' | '_self'
    },
    component: DefaultLayout,
    redirect: '/workbench/index',
  }, */

  // {
  //   path: '/',
  //   redirect: '/dashboard/welcome',
  //   meta: {
  //     hideMenu: true,
  //   },
  // },

  {
    path: '/user/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hideMenu: true,
    },
  },

  // 错误页面
  {
    path: '/error/500',
    name: 'error500',
    component: ErrorPage,
    props: {
      status: 500,
      title: '500',
      subTitle: '抱歉，服务器报告错误。',
    },
    meta: {
      hideMenu: true,
    },
  },
  {
    path: '/error/404',
    name: 'error404',
    component: ErrorPage,
    meta: {
      hideMenu: true,
    },
  },
];

/**
 * 动态路由(需要验证权限)
 */
export const asyncRoutes: RouteRecordRaw[] = [
  // 控制台
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      icon: 'icon-kongzhitai',
      title: '监测数据',
      hideMenu: false,
      permissionCode: 'dashboard',
    },
    component: DefaultLayout,
    redirect: '/dashboard/welcome',
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        meta: {
          title: '欢迎页',
          hideMenu: false,
          permissionCode: 'welcome',
        },
        component: () => import('@/views/dashboard/welcome/index.vue'),
      },
    ],
  },

  {
    path: '/system',
    name: 'system',
    component: DefaultLayout,
    meta: {
      title: '系统设置',
      icon: 'icon-system',
      permissionCode: 'system',
    },
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          hideMenu: false,
          permissionCode: 'user',
        },
        component: () => import('@/views/system/user/index.vue'),
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理',
          permissionCode: 'role',
        },
        component: () => import('@/views/system/role/index.vue'),
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: '菜单管理',
          permissionCode: 'menu',
        },
        component: () => import('@/views/system/menu/index.vue'),
      },
    ],
  },
];
