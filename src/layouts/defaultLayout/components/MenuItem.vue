<script setup lang="ts">
  import { reactive, PropType } from 'vue';
  import type { RouteRecordRaw } from 'vue-router';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  // const IconFont = createFromIconfontCN({
  //   scriptUrl: import.meta.env.VITE_ICONFONT_URL,
  // });
  const IconFont = createFromIconfontCN({
    scriptUrl: import.meta.env.VITE_ICONFONT_URL,
  });

  defineProps({
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
  });

  interface RouteType {
    path: string;
    name: string;
    meta?: {
      icon?: string;
      title?: string;
      hideMenu?: boolean;
    };
  }
  const state = reactive<{ route: RouteType }>({
    route: {
      path: '',
      name: '',
    },
  });

  const hasChild = (item: RouteRecordRaw, children: RouteRecordRaw[] = []) => {
    // 如果没有要显示的子路由器，则显示父级
    if (children.length === 0) {
      state.route = item as unknown as RouteType; // path清空，因为 basePath
      return 1;
    }
    // 当只有一个子路由器时，默认显示子路由器
    if (children.length === 1 && item.meta?.hideChildrenInMenu) {
      state.route = children[0] as unknown as RouteType;
      return 1;
    }
    // 有多个子路由器(二级菜单)
    return 2;
  };
</script>

<template>
  <a-menu-item
    v-if="hasChild(item, item.children) === 1"
    :key="state.route.path"
    :route="state.route"
  >
    <template #icon>
      <IconFont v-if="state.route.meta?.icon" :type="state.route.meta?.icon" />
    </template>
    {{ state.route.meta?.title }}
  </a-menu-item>
  <a-sub-menu v-else-if="hasChild(item, item.children) === 2" :key="item.path">
    <template #icon>
      <IconFont v-if="item.meta?.icon" :type="(item.meta.icon as string)" />
    </template>
    <template #title>{{ item.meta?.title }} </template>
    <MenuItem v-for="child in item.children" :key="child.name" :item="child" />
  </a-sub-menu>
</template>
