<script setup lang="ts">
  import { computed } from 'vue';
  import { useAppStore } from '@/store/modules/app';
  // defineProps<{ msg: string }>()

  const appStore = useAppStore();
  const animation = computed(() => appStore.switchAnimation);
  /* 缓存TODO */
</script>

<template>
  <a-layout-content class="xw-default-content">
    <router-view v-slot="{ Component, route }">
      <transition :name="animation !== 'none' ? `view-switch_${animation}` : ''" mode="out-in">
        <!-- <keep-alive> -->
        <component :is="Component" :key="route.path" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </a-layout-content>
</template>

<style lang="less">
  .xw-default-content {
    position: relative;
    width: 100%;
    overflow-x: hidden !important;
  }

  /* 视图切换动画 会和Modal组件动画冲突，加上前缀 view-switch_ */
  /* fade */
  .view-switch_fade-enter-active,
  .view-switch_fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .view-switch_fade-enter-from,
  .view-switch_fade-leave-to {
    opacity: 0%;
  }

  /* fade-slide */
  .view-switch_fade-slide-leave-active,
  .view-switch_fade-slide-enter-active {
    transition: all 0.3s;
  }

  .view-switch_fade-slide-enter-from {
    opacity: 0%;
    transform: translateX(-30px);
  }

  .view-switch_fade-slide-leave-to {
    opacity: 0%;
    transform: translateX(30px);
  }

  /* fade-bottom */
  .view-switch_fade-bottom-enter-active,
  .view-switch_fade-bottom-leave-active {
    transition: opacity 0.25s, transform 0.3s;
  }

  .view-switch_fade-bottom-enter-from {
    opacity: 0%;
    transform: translateY(-10%);
  }

  .view-switch_fade-bottom-leave-to {
    opacity: 0%;
    transform: translateY(10%);
  }

  /* fade-top */
  .view-switch_fade-top-enter-active,
  .view-switch_fade-top-leave-active {
    transition: opacity 0.2s, transform 0.25s;
  }

  .view-switch_fade-top-enter-from {
    opacity: 0%;
    transform: translateY(8%);
  }

  .view-switch_fade-top-leave-to {
    opacity: 0%;
    transform: translateY(-8%);
  }

  /* zoom */
  .view-switch_zoom-enter-active,
  .view-switch_zoom-leave-active {
    animation-duration: 0.3s;
    animation-fill-mode: both;
    animation-name: viewSwitchZoomIn;
  }
  .view-switch_zoom-leave-active {
    animation-direction: reverse;
  }

  @keyframes viewSwitchZoomIn {
    from {
      opacity: 0;
      transform: scale3d(0.95, 0.95, 0.95);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes viewSwitchZoomOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d(0.95, 0.95, 0.95);
    }
  }
</style>
