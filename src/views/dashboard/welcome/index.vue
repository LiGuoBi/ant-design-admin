<script setup lang="ts">
  // import { ref } from 'vue';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  const IconFont = createFromIconfontCN({
    scriptUrl: import.meta.env.VITE_ICONFONT_URL,
  });
</script>

<template>
  <PageContainer>
    <a-card>
      <IconFont type="icon-shebei" />
      <p v-for="item in 16" :key="item">欢迎页{{ item }}</p>
    </a-card>
  </PageContainer>
</template>

<style scoped lang="less"></style>
