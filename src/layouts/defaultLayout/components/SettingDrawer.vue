<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useAppStore } from '@/store/modules/app';
  import { setStorage, removeStorage, APP_LAYOUT_CACHE_KEY } from '@/utils/storage';
  import _ from 'lodash';
  import { ConfigProvider, message } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import {
    SettingOutlined,
    CloseOutlined,
    CheckOutlined,
    CopyOutlined,
    RedoOutlined,
    SaveOutlined,
  } from '@ant-design/icons-vue';
  // https://github.com/JamieCurnow/vue-clipboard3
  import useClipboard from 'vue-clipboard3';

  export default defineComponent({
    components: {
      SettingOutlined,
      CloseOutlined,
      CheckOutlined,
      CopyOutlined,
      RedoOutlined,
      SaveOutlined,
    },
    setup() {
      const appStore = useAppStore();

      const layoutModes = [
        {
          key: 'side',
          title: '侧边菜单布局',
        },
        {
          key: 'top',
          title: '顶部菜单布局',
        },
        {
          key: 'mix',
          title: '混合布局',
        },
      ];

      const navThemes = [
        {
          key: 'light',
          title: '亮色',
        },
        {
          key: 'dark',
          title: '暗色',
        },
      ];

      const switchAnimationOptions = ref<SelectProps['options']>([
        {
          value: 'none',
          label: 'none',
        },
        {
          value: 'zoom',
          label: 'zoom',
        },
        {
          value: 'fade',
          label: 'fade',
        },

        {
          value: 'fade-slide',
          label: 'fade-slide',
        },
        {
          value: 'fade-bottom',
          label: 'fade-bottom',
        },
        {
          value: 'fade-top',
          label: 'fade-top',
        },
      ]);

      // 内容布局模式
      const contentWidthOptions = ref<SelectProps['options']>([
        {
          value: 'fluid',
          label: '自适应',
        },
        {
          value: 'fixed',
          label: '固定宽度',
        },
      ]);

      // 主题色配置
      const themeColors: string[] = [
        '#1890ff',
        '#f5222d',
        '#fa541c',
        '#faad14',
        '#13c2c2',
        '#52c41a',
        '#2f54eb',
        '#722ed1',
      ];
      const theme = computed(() => appStore.theme);
      const handleThemeClick = (color: string) => {
        appStore.theme = color;
        ConfigProvider.config({
          theme: {
            primaryColor: color,
          },
        });
      };

      // 抽屉隐藏/显示
      const visible = ref<boolean>(false);
      const handleTriggerDrawer = () => {
        visible.value = !visible.value;
      };

      // 拷贝布局
      const { toClipboard } = useClipboard();
      const handleCopy = async () => {
        try {
          const text = `export const defaultLayoutConfig = {
  theme: '${appStore.theme}',
  mode: '${appStore.mode}',
  contentWidth: '${appStore.contentWidth}',
  navTheme: '${appStore.navTheme}',
  headerTheme: '${appStore.headerTheme}',
  fixedHeader: ${appStore.fixedHeader},
  fixedSidebar: ${appStore.fixedSidebar},
  disableMobile: ${appStore.disableMobile},
  showFooter: ${appStore.showFooter},
  headerHeight: ${appStore.headerHeight},
  collapsedWidth: ${appStore.collapsedWidth},
  siderWidth: ${appStore.siderWidth},
  collapsed: ${appStore.collapsed},
  switchAnimation: '${appStore.switchAnimation}',
};`;
          await toClipboard(text);
          message.success('复制成功');
        } catch (e) {
          message.error('复制失败');
        }
      };

      // 缓存布局配置
      const handleCache = () => {
        setStorage(APP_LAYOUT_CACHE_KEY, appStore.getLayoutConfig);
      };

      // 重置布局配置
      const handleReset = () => {
        // 重置
        appStore.$reset();
        // 清除缓存
        removeStorage(APP_LAYOUT_CACHE_KEY);
        // 重新设置主题色
        ConfigProvider.config({
          theme: {
            primaryColor: appStore.theme,
          },
        });
      };

      // try {
      // } catch {
      // } finally {
      // }
      return {
        visible,
        handleTriggerDrawer,
        appStore,
        layoutModes,
        navThemes,
        themeColors,
        theme,
        contentWidthOptions,
        switchAnimationOptions,
        handleThemeClick,
        handleCopy,
        handleCache,
        handleReset,
      };
    },
  });
</script>

<template>
  <a-drawer v-model:visible="visible" :closable="false" :width="300" placement="right">
    <template #handle>
      <div class="xw-layout-setting-btn" @click="handleTriggerDrawer">
        <SettingOutlined v-if="!visible" />
        <CloseOutlined v-else />
      </div>
    </template>
    <div>
      <h3 class="text-base">主题色</h3>
      <div class="flex">
        <div
          v-for="(color, index) in themeColors"
          :key="index"
          :style="{ backgroundColor: color }"
          class="theme-color-block"
          @click="handleThemeClick(color)"
        >
          <CheckOutlined v-if="theme === color" />
        </div>
      </div>

      <a-divider />

      <h3 class="text-base">顶栏颜色</h3>
      <div class="flex">
        <a-tooltip v-for="item in navThemes" :key="item.key">
          <template #title>{{ item.title }}</template>
          <div
            :class="`layout-checkbox-item top ${item.key}`"
            @click="appStore.headerTheme = item.key"
          >
            <CheckOutlined v-if="appStore.headerTheme === item.key" class="select-icon" />
          </div>
        </a-tooltip>
      </div>

      <a-divider />

      <h3 class="text-base">导航条颜色</h3>
      <div class="flex">
        <a-tooltip v-for="item in navThemes" :key="item.key">
          <template #title>{{ item.title }}</template>
          <div
            :class="`layout-checkbox-item side ${item.key}`"
            @click="appStore.navTheme = item.key"
          >
            <CheckOutlined v-if="appStore.navTheme === item.key" class="select-icon" />
          </div>
        </a-tooltip>
      </div>

      <a-divider />

      <h3 class="text-base">导航模式</h3>
      <div class="flex">
        <a-tooltip v-for="item in layoutModes" :key="item.key">
          <template #title>{{ item.title }}</template>
          <div :class="`layout-checkbox-item ${item.key}`" @click="appStore.mode = item.key">
            <CheckOutlined v-if="appStore.mode === item.key" class="select-icon" />
          </div>
        </a-tooltip>
      </div>

      <a-divider />

      <div class="setting-switch-item">
        <span>固定顶栏</span>
        <a-switch
          :checked="appStore.fixedHeader"
          checked-children="开"
          un-checked-children="关"
          size="default"
          @change="(checked: boolean) => appStore.fixedHeader = checked"
        />
      </div>
      <div class="setting-switch-item">
        <span>固定侧边菜单</span>
        <a-switch
          :checked="appStore.fixedSidebar"
          checked-children="开"
          un-checked-children="关"
          size="default"
          @change="(checked: boolean) => appStore.fixedSidebar = checked"
        />
      </div>

      <a-divider />

      <h3 class="text-base">其他设置</h3>
      <div class="setting-switch-item">
        <span>内容区域宽度</span>
        <a-select
          :options="contentWidthOptions"
          :value="appStore.contentWidth"
          style="width: 100px"
          size="small"
          @change="(value: string) => appStore.contentWidth = value"
        />
      </div>

      <div class="setting-switch-item">
        <span>切换动画</span>
        <a-select
          :options="switchAnimationOptions"
          :value="appStore.switchAnimation"
          style="width: 100px"
          size="small"
          @change="(value: string) => appStore.switchAnimation = value"
        />
      </div>

      <div class="setting-switch-item">
        <span>显示页脚</span>
        <a-switch
          :checked="appStore.showFooter"
          checked-children="开"
          un-checked-children="关"
          size="default"
          @change="(checked: boolean) => appStore.showFooter = checked"
        />
      </div>

      <a-divider />

      <a-space direction="vertical" class="w-full" :size="12">
        <a-button type="primary" block @click="handleCache"> <SaveOutlined /> 缓存 </a-button>
        <a-button block @click="handleCopy"> <CopyOutlined />拷贝 </a-button>
        <a-button block @click="handleReset"> <RedoOutlined /> 重置 </a-button>
      </a-space>
    </div>
  </a-drawer>
</template>

<style lang="less">
  .xw-layout-setting-btn {
    position: absolute;
    top: 240px;
    right: 300px;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    text-align: center;
    background: var(--ant-primary-color);
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;

    > span {
      color: rgb(255, 255, 255);
      font-size: 18px;
    }
  }

  .theme-color-block {
    width: 20px;
    height: 20px;
    margin-top: 8px;
    margin-right: 8px;
    color: #fff;
    font-weight: 700;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .setting-switch-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    color: rgba(0, 0, 0, 0.85);
  }

  .layout-checkbox-item {
    position: relative;
    width: 44px;
    height: 36px;
    margin-right: 16px;
    margin-top: 12px;
    overflow: hidden;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
    cursor: pointer;
    .select-icon {
      position: absolute;
      right: 6px;
      bottom: 4px;
      color: var(--ant-primary-color);
      font-weight: 700;
      font-size: 14px;
      pointer-events: none;
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: #001529;
      content: '';
    }
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #001529;
      content: '';
    }
    &.side {
      &:before {
        z-index: 1;
      }
      &::after {
        background-color: #fff;
      }
    }
    &.top {
      &::before {
        display: none;
      }
      &.light::after {
        background-color: #fff;
      }
    }
    &.mix {
      &::before {
        background-color: #fff;
      }
    }
    &.light::before {
      background-color: #fff;
    }
    &.light::after {
      background-color: #fff;
    }
  }
</style>
