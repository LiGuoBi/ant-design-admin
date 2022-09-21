<script setup lang="ts">
  import { PropType } from 'vue';
  defineProps({
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: 404,
    },
    title: {
      type: String as PropType<string>,
      default: '404',
    },
    subTitle: {
      type: String as PropType<string>,
      default: '对不起，您访问的页面不存在。',
    },
  });
</script>

<template>
  <a-result :status="status" :title="title" :sub-title="subTitle">
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>

<style lang="less"></style>
