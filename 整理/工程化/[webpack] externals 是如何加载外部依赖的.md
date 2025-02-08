
当在 Webpack 配置文件中使用externals选项时，实际上是在告诉 Webpack 某些模块应该被视为外部依赖，而不是被打包进最终的输出文件。这意味着这些模块将在运行时由浏览器或其他运行环境提供，而不是由 Webpack 处理。

**在浏览器环境中的加载方式（以全局变量为例）**

配置externals：

假设项目依赖于lodash库，并且希望在浏览器环境中通过<script>标签加载lodash的全局变量。首先在 Webpack 配置文件中这样配置externals：

```js
module.exports = {
  //...其他配置
  externals: {
    lodash: "lodash",
  },
};
```

HTML 文件中的脚本引入：

然后在 HTML 文件中，需要手动添加<script>标签来引入lodash。例如：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <script src="your-main-app-bundle.js"></script>
  </body>
</html>
```

在这里，your-main-app-bundle.js是 Webpack 打包后的应用程序主文件。当 Webpack 在代码中遇到 `import _ from 'lodash';` 语句时，它不会将lodash的代码打包进输出文件，而是假设lodash已经在运行时环境中存在，并且可以通过全局变量lodash访问。所以在打包后的 JavaScript 代码中，实际上是通过全局变量来引用外部依赖的。



