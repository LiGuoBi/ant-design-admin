module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // css3变量实现动态主题
        primary: 'var(--ant-primary-color)',
        warning: 'var(--ant-warning-color)',
        error: 'var(--ant-error-color)',
        success: 'var(--ant-success-color)',
      },
      height: {},
      width: {},
    },
    // 设置 tailwindCSS 响应断点同 ant-design 一样
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
  },
  plugins: [],
};
