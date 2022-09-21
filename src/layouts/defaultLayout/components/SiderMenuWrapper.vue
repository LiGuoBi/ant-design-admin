<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useAppStore } from '@/store/modules/app';
  import SiderMenu from './SiderMenu.vue';
  // Props使用TS类型声明
  defineProps<{
    isMobile: boolean;
  }>();
  const appStore = useAppStore();
  const { collapsed, siderWidth } = storeToRefs(appStore);
  // const collapsed = computed(() => appStore.collapsed);
  // const siderWidth = computed(() => appStore.siderWidth);

  const handleDrawerClose = () => {
    appStore.collapsed = !collapsed.value;
  };
</script>

<template>
  <a-drawer
    v-if="isMobile"
    :visible="!collapsed"
    :closable="false"
    placement="left"
    :width="siderWidth"
    @close="handleDrawerClose"
    :bodyStyle="{
      height: '100vh',
      padding: 0,
    }"
  >
    <SiderMenu :isMobile="isMobile" />
  </a-drawer>
  <SiderMenu :isMobile="isMobile" v-else />
</template>
