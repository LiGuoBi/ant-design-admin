<script setup lang="ts">
  import { computed } from 'vue';
  import { useAppStore } from '@/store/modules/app';
  import useMediaQuery from '@/hooks/useMediaQuery';
  import { useRouter } from 'vue-router';
  defineProps({
    title: {
      type: String,
    },
    // 是否显示路由标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
    },
  });

  interface RouteType {
    path: string;
    title: string;
  }

  // 屏幕响应断点
  const colSize = useMediaQuery();
  // 内容宽度
  const appStore = useAppStore();
  const contentWidth = computed(() => {
    if (appStore.contentWidth === 'fixed' && (colSize.value === 'xl' || colSize.value === 'xxl')) {
      return 'xw-page-content-fixed';
    } else {
      return 'xw-page-content-fluid';
    }
  });
  // 面包屑
  const router = useRouter();
  const routes = computed(() => {
    const routes: RouteType[] = [{ path: '/', title: '首页' }];
    router.currentRoute.value.matched.forEach((item) => {
      if (!item.meta.hideChildrenInMenu) {
        routes.push({ path: item.path, title: (item.meta?.title as string) || '标题' });
      }
    });
    return routes;
  });
  // defineProps<{ msg: string }>()

  // const count = ref(0);
</script>

<template>
  <div class="xw-page-container">
    <div class="xw-page-header">
      <!-- 标签页 TODO -->
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(item, index) in routes" :key="item.path">
          <router-link v-if="index < routes.length - 1" :to="item.path">
            {{ item.title }}
          </router-link>
          <template v-else>{{ item.title }}</template>
        </a-breadcrumb-item>
      </a-breadcrumb>

      <template v-if="$slots.title">
        <slot name="title"></slot>
      </template>
      <template v-else>
        <div v-if="title" class="xw-page-header-title">
          {{ title }}
        </div>
        <div v-else-if="showTitle" class="xw-page-header-title">
          {{ router.currentRoute.value.meta.title }}
        </div>
      </template>

      <slot name="content"></slot>
      <div v-if="!$slots.content && content" class="xw-page-header-content">
        {{ content }}
      </div>
      <!-- {{ $slots }} -->
    </div>

    <div :class="['xw-page-content', contentWidth]">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
  .xw-page-header {
    background: #fff;
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 16px;
    .ant-breadcrumb {
      padding-bottom: 16px;
    }
  }
  .xw-page-header-title {
    font-weight: 600;
    font-size: 20px;
    padding-bottom: 16px;
  }
  .xw-page-header-content {
    padding-bottom: 16px;
  }
  .xw-page-content {
    position: relative;
    // 流体布局
    &-fluid {
      margin: 24px;
    }
    // 固定1200
    &-fixed {
      max-width: 1200px;
      margin: 24px auto;
    }
  }
</style>
