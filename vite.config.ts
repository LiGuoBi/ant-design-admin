import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// ant-design-vue 按需引入
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
import { createHtmlPlugin } from 'vite-plugin-html';

// mock 模拟数据
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
  const { VITE_APP_TITLE } = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            // 不按需引入 ant-design-vue css样式，在main.js全局引入，实现动态主题
            importStyle: false,
          }),
        ],
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            appTitle: VITE_APP_TITLE,
            injectScript: ``,
          },
        },
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: './src/mock',
        injectCode: `
          import { setupProdMockServer } from '@/mock/_createProductionServer';

          setupProdMockServer();
        `,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
