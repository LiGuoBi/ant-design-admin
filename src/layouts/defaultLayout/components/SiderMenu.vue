<script setup lang="ts">
  import { CSSProperties, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useAppStore } from '@/store/modules/app';
  import Menu from './Menu.vue';

  // 声明props参数
  const props = defineProps<{ isMobile: boolean }>();
  const appTitle = import.meta.env.VITE_APP_TITLE;

  const appStore = useAppStore();

  // 菜单是否折叠
  const collapsed = computed(() => (props.isMobile ? false : appStore.collapsed));
  const {
    mode: layoutMode,
    // 是否固定菜单
    fixedSidebar,
    // 菜单主题
    navTheme,
    // header高度
    headerHeight,
    // 菜单收起宽度
    collapsedWidth,
    // 菜单展开宽度
    siderWidth,
  } = storeToRefs(appStore);

  // const layoutMode = computed(() => appStore.mode);
  // // 是否固定菜单
  // const fixedSidebar = computed(() => appStore.fixedSidebar);
  // // 菜单主题
  // const navTheme = computed(() => appStore.navTheme);
  // // header高度
  // const headerHeight = computed(() => appStore.headerHeight);
  // // 菜单收起宽度
  // const collapsedWidth = computed(() => appStore.collapsedWidth);
  // // 菜单展开宽度
  // const siderWidth = computed(() => appStore.siderWidth);

  // 侧边菜单固定时的占位样式
  const hiddenDomStyle = computed((): CSSProperties => {
    const width = `${collapsed.value ? collapsedWidth.value : siderWidth.value}px`;
    return {
      width: width,
      overflow: 'hidden',
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
      transition: 'all 0.2s',
    };
  });

  // 侧边菜单动态添加class
  const siderClassName = computed(() => {
    return {
      'xw-default-sider': true,
      'xw-default-sider-fixed': fixedSidebar.value,
      'xw-default-sider-collapsed': collapsed.value,
    };
  });

  // 菜单底部折叠按钮事件
  const handleCollapsedTrigger = () => {
    appStore.$patch({
      collapsed: !collapsed.value,
    });
  };
</script>

<template>
  <!-- 侧边菜单固定时的占位元素 -->
  <div v-if="fixedSidebar" :style="hiddenDomStyle"></div>
  <a-layout-sider
    :class="siderClassName"
    :style="{
      paddingTop: layoutMode === 'mix' && !isMobile ? `${headerHeight}px` : undefined,
    }"
    breakpoint="lg"
    :width="siderWidth"
    collapsible
    :collapsed="collapsed"
    :collapsedWidth="collapsedWidth"
    :trigger="null"
    :theme="navTheme"
  >
    <!-- <div class="text-color">文字颜色</div> -->
    <div v-if="layoutMode === 'side' || isMobile" class="sider-head-logo">
      <img src="@/assets/logo.png" alt="" />
      <h1 v-if="!collapsed">{{ appTitle }}</h1>
    </div>

    <div class="menu-wrapper">
      <Menu :theme="navTheme" mode="inline" :isMobile="isMobile" />
    </div>

    <div class="sider-foot">
      <!-- 菜单折叠按钮 -->
      <a-menu
        :theme="navTheme"
        @click="handleCollapsedTrigger"
        :selectedKeys="[]"
        :openKeys="[]"
        mode="inline"
        :inlineIndent="16"
      >
        <a-menu-item class="collapsed-button" key="collapsed-button" title="">
          <template #icon>
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </template>
        </a-menu-item>
      </a-menu>
      <!-- 菜单折叠按钮 end -->
    </div>
  </a-layout-sider>
</template>

<style lang="less">
  .xw-default-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    .ant-layout-sider-children {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    // logo
    .sider-head-logo {
      position: relative;
      display: flex;
      align-items: center;
      padding: 16px 16px;
      line-height: 32px;
      cursor: pointer;
      img {
        width: 32px;
        height: 32px;
      }
      h1 {
        color: #fff;
        font-size: 14px;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 0;
        margin: 0 0 0 12px;
      }
    }
    .menu-wrapper {
      flex: 1;
      overflow: hidden auto;
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 3px;
        box-shadow: inset 0 0 5px rgba(37, 37, 37, 0.05);
      }

      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05);
      }
    }
    // 菜单固定
    &-fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99; // react pro-components: z-index: 100;
      height: 100%;
      overflow: auto;
      overflow-x: hidden;
    }
    // 菜单折叠
    &-collapsed {
      .sider-head-logo {
        padding: 16px 8px;
      }
    }
    // 折叠按钮重置样式
    .collapsed-button {
      margin: 0;
      height: 48px;
      padding: 4px 16px !important;
      .anticon {
        font-size: 16px;
        transition: none;
      }
    }
    // 默认暗色主题
    .text-color {
      color: #fff;
    }
    // 亮色主题
    &.ant-layout-sider-light {
      .text-color {
        color: inherit;
      }
      .sider-head-logo {
        h1 {
          color: var(--ant-primary-color);
        }
      }
      .ant-menu-light {
        border-right-color: transparent;
      }

      .menu-wrapper {
        &::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.06);
          border-radius: 3px;
          box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
        }

        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.12);
          border-radius: 3px;
          box-shadow: inset 0 0 5px rgba(0, 21, 41, 0.05);
        }
      }
      .sider-foot {
        border-top: 1px solid #f0f0f0;
      }
    }
  }
</style>
