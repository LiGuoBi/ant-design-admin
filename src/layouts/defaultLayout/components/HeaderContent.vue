<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAppStore } from '@/store/modules/app';
  import { useUserStore } from '@/store/modules/user';
  import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    LogoutOutlined,
    UserOutlined,
  } from '@ant-design/icons-vue';
  import { Modal } from 'ant-design-vue';
  import Menu from './Menu.vue';
  import { useRouter } from 'vue-router';
  // 声明props参数
  defineProps<{ isMobile: boolean }>();
  const appStore = useAppStore();
  const layoutMode = computed(() => appStore.mode);

  const { collapsed, headerTheme } = storeToRefs(appStore);
  // const collapsed = computed(() => appStore.collapsed);
  // const headerTheme = computed(() => appStore.headerTheme);

  const appTitle = import.meta.env.VITE_APP_TITLE;

  const handleCollapsedTrigger = () => {
    appStore.collapsed = !collapsed.value;
  };

  // 退出登录
  const userStore = useUserStore();
  const router = useRouter();
  const logout = () => {
    Modal.confirm({
      title: '确定要退出登录吗?',
      content: '',
      onOk() {
        userStore.logout().then(() => {
          router.push({ name: 'login' });
        });
      },
    });
  };
</script>

<template>
  <div class="xw-default-header-content">
    <!-- logo -->
    <div class="header-logo" v-if="layoutMode !== 'side' && !isMobile">
      <img src="@/assets/logo.png" alt="" />
      <h1>{{ appTitle }}</h1>
    </div>
    <!-- 折叠or显示菜单按钮 -->
    <div
      v-if="layoutMode === 'side' || isMobile"
      class="collapsed-button"
      @click="handleCollapsedTrigger"
    >
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </div>
    <div class="top-nav">
      <template v-if="layoutMode === 'top' && !isMobile">
        <Menu :theme="headerTheme" mode="horizontal" :isMobile="isMobile" />
      </template>
    </div>
    <!-- 右侧操作按钮 -->
    <div class="right-content">
      <a-dropdown>
        <div class="action">
          <UserOutlined />
          <span class="text-color user-name">{{ userStore.userInfo?.name }}</span>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <template #icon>
                <SettingOutlined />
              </template>
              <span>个人设置</span>
            </a-menu-item>
            <a-menu-item @click="logout">
              <template #icon>
                <LogoutOutlined />
              </template>
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style lang="less">
  .xw-default-header-content {
    // padding: 0 16px;
    height: 100%;
    width: 100%;
    display: flex;
    & > * {
      height: 100%;
    }
    .header-logo {
      padding: 0 16px;
      position: relative;
      display: flex;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
      }
      h1 {
        color: #fff;
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 0;
        margin: 0 0 0 12px;
      }
    }
    .collapsed-button {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .top-nav {
      flex: 1 1 0%;
      min-width: 0;
      margin: 0 10px;
    }
    .right-content {
      display: flex;
      font-size: 16px;
      .text {
        padding: 0 12px;
      }
      .action {
        cursor: pointer;
        padding: 0 12px;
        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
  // 亮色主题
  .xw-default-header-light {
    .header-logo {
      h1 {
        color: var(--ant-primary-color);
      }
    }
  }
</style>
