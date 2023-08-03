> 问题描述：vite 打包 npm lib库，直接引入组件不包含css。

打包出来的css和js分离了，导致样式会消失，需要手动引入。

解决方案：
1. 在配置的时候加上 `cssCodeSplit: false`；
2. 如果上面不生效，可以安装 `vite-plugin-libcss` 插件，这个插件会在打包出来的 xxx.js  的第一行自动加上 `import style.css`。

参考：

- https://www.zhihu.com/question/470701634
- https://github.com/wxsms/vite-plugin-libcss/blob/master/index.js
- https://blog.csdn.net/exxes/article/details/125520427
