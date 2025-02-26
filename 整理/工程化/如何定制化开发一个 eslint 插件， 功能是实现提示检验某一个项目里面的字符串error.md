以下是一个可以检测特定字符串并支持参数传递的 ESLint 插件开发步骤：

## 一、创建插件项目

创建一个新的目录来存放插件项目，例如eslint-plugin-custom-string-check。

在该目录下，运行npm init初始化一个 npm 项目。

## 二、插件结构

在项目目录下创建一个index.js文件作为插件的入口文件。

定义插件对象：

```js
module.exports = {
  rules: {},
};
```

## 三、实现规则

定义规则函数，接收一个参数options，这个参数可以包含你要检测的字符串。

```js
module.exports = {
  rules: {
    "check-custom-string": (context, options) => {
      return {
        Program(node) {
          const sourceCode = context.getSourceCode();
          const text = sourceCode.getText();
          const targetString = options && options.stringToCheck ? options.stringToCheck : null;
          if (targetString && text.includes(targetString)) {
            context.report({
              node,
              message: `Found custom string "${targetString}".`,
            });
          }
        },
      };
    },
  },
};
```

## 四、测试插件

1. 在项目目录下创建一个tests目录。
2. 在tests目录下创建一个测试文件，例如test.js。

```js
const ruleTester = require("eslint").RuleTester;
const rule = require("../index").rules["check-custom-string"];

const ruleTester = new RuleTester();
ruleTester.run("check-custom-string", rule, {
  valid: [
    {
      code: 'const message = "This is a test.";',
      options: { stringToCheck: "errorMessage" },
    },
  ],
  invalid: [
    {
      code: 'const errorMessage = "This is an error.";',
      options: { stringToCheck: "errorMessage" },
      errors: [
        {
          message: 'Found custom string "errorMessage".',
        },
      ],
    },
  ],
});
```

## 五、使用插件

在你的项目中安装这个插件：

```
npm install /path/to/your/plugin/eslint-plugin-custom-string-check --save-dev
```

在项目的.eslintrc文件中配置插件：

```js
{
  "plugins": ["custom-string-check"],
  "rules": {
    "custom-string-check/check-custom-string": ["error", { "stringToCheck": "yourTargetString" }]
  }
}
```
