<script lang="ts">
  import { computed, reactive, defineComponent, watch } from 'vue';
  import { useRouter, type RouteRecordRaw } from 'vue-router';
  import MenuItem from './MenuItem.vue';
  import { useAppStore } from '@/store/modules/app';
  import { useUserStore } from '@/store/modules/user';
  import { isUrl } from '@/utils';
  import _ from 'lodash';
  // 生成菜单
  const getMenuData = (routes: RouteRecordRaw[], parent?: RouteRecordRaw): RouteRecordRaw[] => {
    return (
      routes
        .map((route) => {
          // 判断隐藏菜单
          if (route.meta?.hideMenu) {
            return null;
          }
          // startWith : http | https
          if (isUrl(route.path)) {
            return route;
          }
          if (!route.path.startsWith('/') && parent) {
            route.path = `${parent.path || ''}/${route.path}`;
          }
          // format children routes
          if (route.children && route.children.length > 0) {
            route.children = getMenuData(route.children, route);
          }
          return route;
        })
        // 过滤隐藏菜单，不为空
        .filter((item) => item !== null) as RouteRecordRaw[]
    );
  };

  export default defineComponent({
    components: {
      MenuItem,
    },
    props: {
      mode: {
        type: String,
        default: 'inline',
      },
      theme: {
        type: String,
        default: 'dark',
      },
      layout: {
        type: String,
        default: 'side',
      },
      isMobile: {
        type: Boolean,
        required: true,
      },
    },
    setup(props) {
      const router = useRouter(); // 路由器
      const appStore = useAppStore();
      const userStore = useUserStore();
      const collapsed = computed(() => appStore.collapsed);

      const state = reactive<{
        menus: RouteRecordRaw[];
        openKeys: string[];
        selectedKeys: string[];
      }>({
        // menus: getMenuData(_.cloneDeep(router.options.routes)), // 创建 Router 时传递的原始配置对象
        // menus: getMenuData(_.cloneDeep(userStore.permissionRoutes)), // 权限路由
        menus: getMenuData(_.cloneDeep(userStore.allRoutes)), // 全部路由
        openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
        selectedKeys: [], // 当前选中的菜单项 key 数组
      });

      const handleMenuClick = (_event: any) => {
        // console.log('MenuClick', _event);
      };
      const handleSubMenuOpenChange = (keys: string[]) => {
        // console.log('SubMenuOpenChange', keys);
        state.openKeys = keys;
      };
      const handleMenuSelect = ({
        item: { route },
        key,
        selectedKeys,
      }: {
        item: { route: RouteRecordRaw };
        key: string;
        selectedKeys: string[];
      }) => {
        // if 跳转方式
        if (route.meta?.target) {
          const target = route.meta.target as string;
          // if 跳转外链
          if (isUrl(key)) {
            window.open(key, target);
          } else {
            // 返回路由地址的标准化版本。
            const routeUrl = router.resolve(key);
            window.open(routeUrl.href, target);
          }
        } else {
          // 站内跳转
          router.push(key);
          state.selectedKeys = selectedKeys;
        }
      };

      // 设置菜单选中
      watch(
        () => router.currentRoute,
        () => {
          const matched = router.currentRoute.value.matched.concat();
          const path = router.currentRoute.value.path;
          state.selectedKeys = matched.filter((r) => r.path === path).map((r) => r.path);
          if (props.mode === 'inline' && !collapsed.value) {
            state.openKeys = matched.filter((r) => r.path !== path).map((r) => r.path);
          }
        },
        {
          immediate: true,
        },
      );

      return {
        state,
        handleMenuClick,
        handleSubMenuOpenChange,
        handleMenuSelect,
      };
    },
  });
</script>

<template>
  <a-menu
    :mode="mode"
    :theme="theme"
    :openKeys="state.openKeys"
    :selectedKeys="state.selectedKeys"
    @click="handleMenuClick"
    @openChange="handleSubMenuOpenChange"
    @select="handleMenuSelect"
  >
    <template v-for="item in state.menus" :key="item.path">
      <MenuItem :item="item" />
    </template>
  </a-menu>
</template>

<style lang="less"></style>
