# Vue 3 + TypeScript + Vite

## Vue项目打包部署到GitHub Pages的实现步骤

- `yarn build`打包项目，提交git

- 使用`git subtree push --prefix dist origin gh-pages`将dist目录推送到远程的`gh-pages`分支，若远程没有`gh-pages`分支则会新建`gh-pages`分支然后再推送。
