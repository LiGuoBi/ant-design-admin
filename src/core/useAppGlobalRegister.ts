import type { App } from 'vue';
import { usePermission } from '@/hooks/usePermission';
import PageContainer from '@/layouts/defaultLayout/components/PageContainer.vue';
// import { createFromIconfontCN } from '@ant-design/icons-vue';
// const IconFont = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_3136609_dimlmlixadp.js',
// });

// 声明vue挂载的全局属性
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    PageContainer: any;
  }
}

export default function useAppGlobalRegister(app: App) {
  app.component('PageContainer', PageContainer);
  // app.component('IconFont', IconFont);

  // 全局指令
  const { $auth } = usePermission();
  // 按钮权限验证
  app.directive('auth', {
    // 绑定元素的父组件被挂载后调用
    mounted(el, binding: any) {
      if (!$auth(binding.value)) {
        // 获取el父节点在removeChild移除子节点el
        el.parentNode?.removeChild(el);
      }
    },
  });
}
