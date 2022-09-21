// import { useAppStore } from '@/store/modules/app';
import { useUserStore } from '@/store/modules/user';
import { notification } from 'ant-design-vue';
import type { Router } from 'vue-router';
import NProgress from 'nprogress';
import '@/styles/nprogress.less';

export default function setupRouterGuard(router: Router) {
  NProgress.configure({ showSpinner: false });

  const allowList = ['login']; // 白名单页面
  const loginRoutePath = '/user/login';
  const defaultRoutePath = '/dashboard/welcome';

  router.beforeEach(async (to, from, next) => {
    // console.log('to', to);
    // console.log('from', from);
    // console.log('--------------------');
    const userStore = useUserStore();
    NProgress.start();
    // 设置标题
    to.meta && to.meta.title && (document.title = to.meta.title as string);
    if (userStore.token) {
      if (to.path === loginRoutePath) {
        // 判断是否带有重定向
        next({ path: decodeURIComponent((to.query.redirect || defaultRoutePath) as string) });
        NProgress.done();
      } else {
        if (userStore.permissionRoutes.length === 0) {
          try {
            const { permissionRoutes } = await userStore.getUserInfoAction();
            permissionRoutes.forEach((route: any) => {
              // 动态添加可访问路由表
              router.addRoute(route);
            });
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ ...to, replace: true });
          } catch (error) {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试',
            });
            try {
              await userStore.logout();
              next({ path: loginRoutePath, query: { redirect: to.fullPath } });
            } catch (error) {
              next('/error/500');
            }
          }
        } else {
          next();
        }
      }
    } else {
      if (allowList.includes(to.name as string)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } });
        NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
