import { defineStore } from 'pinia';
import { store } from '@/store';
import { setStorage, removeStorage, TOKEN_CACHE_KEY, USERINFO_CACHE_KEY } from '@/utils/storage';
import type { RouteRecordRaw } from 'vue-router';
import { notFoundRoutes, asyncRoutes, constantRoutes } from '@/router/routes';
import { userLogin, getUserInfo } from '@/api/sys/user';
import {
  UserLoginParams,
  UserLoginResult,
  UserInfoResult,
  PermissionType,
} from '@/api/sys/types/user';

/** 嵌套权限菜单，转为数组Code */
function getPermissionCode(permissions: PermissionType[]) {
  return permissions.reduce((pre: string[], item: PermissionType) => {
    item = Object.assign({}, item);
    pre.push(item.menuCode);
    if (item.children && item.children.length > 0) {
      const arr: string[] = getPermissionCode(item.children);
      if (arr) {
        pre.push(...arr);
      }
    }
    return pre;
  }, []);
}

/** 根据权限code过滤路由菜单 */
function filterAsyncRoutes(routes: RouteRecordRaw[], permissionCodes: string[]) {
  return routes.filter((route) => {
    if (permissionCodes.includes(route.meta?.permissionCode as string)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children, permissionCodes);
      }
      return true;
    } else {
      return false;
    }
  });
}

interface UserStateType {
  userInfo: UserInfoResult | undefined;
  token: string;
  permissionCodes: string[];
  permissionRoutes: RouteRecordRaw[];
  allRoutes: RouteRecordRaw[];
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserStateType => {
    return {
      userInfo: undefined,
      token: '',
      permissionCodes: [],
      permissionRoutes: [],
      allRoutes: [],
    };
  },
  getters: {},
  actions: {
    /** 用户登录 */
    login(data: UserLoginParams): Promise<ResponseResult<UserLoginResult>> {
      return new Promise((resolve, reject) => {
        userLogin(data)
          .then((response) => {
            this.token = response.data.token;
            setStorage(TOKEN_CACHE_KEY, response.data.token);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /** 用户信息 */
    getUserInfoAction(): Promise<{
      userInfo: UserInfoResult;
      permissionCodes: string[];
      permissionRoutes: RouteRecordRaw[];
    }> {
      return getUserInfo()
        .then((res) => {
          const userInfo = res.data;
          // 权限码
          const codes = getPermissionCode(res.data.permissions);
          // 路由
          const routes = filterAsyncRoutes(asyncRoutes, codes);

          if (routes.length > 0) {
            // 添加根路径重定向记录
            const redirect = routes[0].path;
            routes.unshift({
              path: '/',
              redirect: redirect,
              meta: { hideMenu: true },
            });
            // 添加404
            routes.push(notFoundRoutes);
          }

          this.userInfo = userInfo;
          this.permissionCodes = codes;
          this.permissionRoutes = routes;
          this.allRoutes = constantRoutes.concat(routes);

          return Promise.resolve({
            userInfo,
            permissionCodes: codes,
            permissionRoutes: routes,
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    /** 登出 */
    logout() {
      return new Promise<void>((resolve, _reject) => {
        // del token
        this.token = '';
        removeStorage(TOKEN_CACHE_KEY);
        // del userInfo
        this.userInfo = undefined;
        removeStorage(USERINFO_CACHE_KEY);
        // 清空路由
        this.permissionCodes = [];
        this.permissionRoutes = [];
        this.allRoutes = constantRoutes;
        resolve();
      });
    },
  },
});

/** 需要在设置外部使用 */
export function useUserStoreWithOut() {
  return useUserStore(store);
}
