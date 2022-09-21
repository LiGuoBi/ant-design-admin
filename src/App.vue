<script setup lang="ts">
  import { ref } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { useAppStore } from '@/store/modules/app';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

  // 设置语言
  const locale = ref(zhCN);
  dayjs.locale('zh-cn');

  // 设置默认主题色
  const appStore = useAppStore();
  ConfigProvider.config({
    theme: {
      primaryColor: appStore.theme,
    },
  });
</script>

<template>
  <ConfigProvider :locale="locale">
    <router-view />
  </ConfigProvider>
</template>

<style></style>
