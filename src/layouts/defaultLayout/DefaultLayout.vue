<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useAppStore } from '@/store/modules/app';
  import useMediaQuery from '@/hooks/useMediaQuery';
  import SiderMenuWrapper from './components/SiderMenuWrapper.vue';
  import HeaderWrapper from './components/HeaderWrapper.vue';
  import ContentWrapper from './components/ContentWrapper.vue';
  import SettingDrawer from './components/SettingDrawer.vue';

  const appStore = useAppStore();
  const layoutMode = computed(() => appStore.mode);
  const showFooter = computed(() => appStore.showFooter);

  // 获取屏幕断点 是否是移动端
  const colSize = useMediaQuery();
  const isMobile = computed(() => {
    return (colSize.value === 'sm' || colSize.value === 'xs') && !appStore.disableMobile;
  });

  onMounted(() => {
    // console.log('default layout');
  });
</script>

<template>
  <div class="xw-default-layout">
    <a-layout style="min-height: 100vh">
      <SiderMenuWrapper v-if="layoutMode !== 'top' || isMobile" :isMobile="isMobile" />
      <a-layout>
        <HeaderWrapper :isMobile="isMobile" />
        <ContentWrapper />
        <a-layout-footer v-if="showFooter">
          <div class="ant-pro-global-footer-copyright">Copyright &copy;</div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- 布局设置 -->
    <SettingDrawer />
  </div>
</template>

<style lang="less">
  .xw-default-layout {
    min-height: 100vh;
    .ant-layout-footer {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      text-align: center;
    }
  }
</style>
