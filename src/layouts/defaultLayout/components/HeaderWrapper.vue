<script setup lang="ts">
  import { toRefs, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAppStore } from '@/store/modules/app';
  import HeaderContent from './HeaderContent.vue';
  // Props使用运行时声明
  const props = defineProps({
    isMobile: Boolean,
  });
  const { isMobile } = toRefs(props);
  const appStore = useAppStore();
  const {
    // 布局模式
    mode: layoutMode,
    // 侧边菜单是否折叠
    collapsed,
    // header主题
    headerTheme,
    // header高度
    headerHeight,
    // 菜单收起宽度
    collapsedWidth,
    // 菜单展开宽度
    siderWidth,
  } = storeToRefs(appStore);

  // 布局模式
  // const layoutMode = computed(() => appStore.mode);
  // // 侧边菜单是否折叠
  // const collapsed = computed(() => appStore.collapsed);
  // // header主题
  // const headerTheme = computed(() => appStore.headerTheme);
  // // header高度
  // const headerHeight = computed(() => appStore.headerHeight);
  // // 菜单收起宽度
  // const collapsedWidth = computed(() => appStore.collapsedWidth);
  // // 菜单展开宽度
  // const siderWidth = computed(() => appStore.siderWidth);

  // 是否固定Header
  const fixedHeader = computed(() => appStore.fixedHeader || layoutMode.value === 'mix');

  const siderClassName = computed(() => ({
    'xw-default-header': true,
    'xw-default-header-fixed': fixedHeader.value,
    'xw-default-header-light': headerTheme.value === 'light',
  }));

  // 动态计算header宽度
  const headerWidth = computed(() => {
    return layoutMode.value === 'side' && !isMobile.value && fixedHeader.value
      ? `calc(100% - ${collapsed.value ? collapsedWidth.value : siderWidth.value}px)`
      : '100%';
  });
</script>

<template>
  <div
    v-if="fixedHeader"
    :style="{
      height: `${headerHeight}px`,
      lineHeight: `${headerHeight}px`,
      background: 'transparent',
    }"
  ></div>
  <a-layout-header
    :class="siderClassName"
    :style="{
      height: `${headerHeight}px`,
      lineHeight: `${headerHeight}px`,
      width: headerWidth,
      zIndex: layoutMode === 'mix' ? 100 : 19,
    }"
  >
    <HeaderContent :isMobile="isMobile" />
  </a-layout-header>
</template>

<style lang="less">
  .xw-default-header {
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    padding: 0;
    transition: all 0.2s;
    &-fixed {
      padding: 0;
      position: fixed;
      top: 0;
      right: 0;
      transition: width 0.2s;
    }
    // 默认暗色主题
    .text-color,
    .anticon {
      color: #fff;
    }
    // 亮色主题
    &-light {
      .text-color,
      .anticon {
        color: inherit;
      }
      background: #fff;
    }
  }
</style>
