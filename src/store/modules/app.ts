import { defineStore } from 'pinia';
import _ from 'lodash';

// 类型字段
interface AppStateType {
  // 主题色
  theme: string;
  // 布局菜单模式 side:右导航 top:顶导航 mix:混合
  mode: string;
  // 内容布局模式 fluid:自适应 fixed:固定宽度1200px
  contentWidth: string;
  // 导航主题 light:亮色 dark:黑暗
  navTheme: string;
  // 顶栏主题 light:亮色 dark:黑暗
  headerTheme: string;
  // 固定 Header
  fixedHeader: boolean;
  // 固定 Sidebar
  fixedSidebar: boolean;
  // 是否禁用移动端模式
  disableMobile: boolean;
  // 显示页脚
  showFooter: boolean;
  // header高度
  headerHeight: number;
  // 侧边菜单收起宽度
  collapsedWidth: number;
  // 侧边菜单展开宽度
  siderWidth: number;
  // 是否折叠菜单
  collapsed: boolean;
  // 路由切换动画
  switchAnimation: string;

  // 页面加载状态
  pageLoading: boolean;
}

// 项目AppStore配置
export const defaultLayoutConfig = {
  theme: '#1890ff',
  mode: 'side',
  contentWidth: 'fluid',
  navTheme: 'dark',
  headerTheme: 'light',
  fixedHeader: true,
  fixedSidebar: true,
  disableMobile: false,
  showFooter: true,
  headerHeight: 48,
  collapsedWidth: 48,
  siderWidth: 208,
  collapsed: false,
  switchAnimation: 'zoom',
};

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStateType => {
    return {
      ...defaultLayoutConfig,
      pageLoading: false,
    };
  },
  getters: {
    getLayoutConfig(state) {
      // state = this
      return _.pick(state, _.keys(defaultLayoutConfig));
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
  },
});
