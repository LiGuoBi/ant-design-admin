// tailwind 先引入时 Ant Design 覆盖重置样式
import '@/styles/tailwind.css';
// 引入 Ant Design CSS样式变量版本，实现动态主题
import 'ant-design-vue/dist/antd.variable.min.css';
// 重置 自定义样式
import '@/styles/index.less';

import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '@/store';
import { setupRouter, router } from '@/router';
import setupRouterGuard from '@/core/setupRouterGuard';
import initStoreConfig from '@/core/initStoreConfig';
import setupAntDesign from '@/core/setupAntDesign';
import useAppGlobalRegister from '@/core/useAppGlobalRegister';

const app = createApp(App);
// 安装全局状态管理 pinia
setupStore(app);
// 安装路由
setupRouter(app);
// 设置路由守卫(权限验证)
setupRouterGuard(router);
// 设置AppStore的初始值，必须在安装 pinia 之后执行
initStoreConfig();
// 安装 ant-design-vue UI库
setupAntDesign(app);
// 在app实例上注册全局组件和指令
useAppGlobalRegister(app);

app.mount('#app');
