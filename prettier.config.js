module.exports = {
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 行尾需要有分号
  semi: true,
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 使用单引号代替双引号
  singleQuote: true,
  // 末尾使用逗号
  trailingComma: 'all',
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',

  vueIndentScriptAndStyle: true,
  // 一行最多 100 字符
  printWidth: 100,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'auto',
};
