<script setup lang="ts">
  import { ref } from 'vue';

  const title = ref('菜单管理');
</script>

<template>
  <PageContainer>
    <!-- <template #title>
      <div>自定义title</div>
    </template>
    <template #content>
      <div>自定义content</div>
    </template> -->

    <h2>{{ title }}</h2>
  </PageContainer>
</template>

<style lang="less"></style>
