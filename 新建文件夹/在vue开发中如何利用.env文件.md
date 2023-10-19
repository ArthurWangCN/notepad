我们在 vue 项目的目录中经常看到 env 开头的文件，在文件内声明一些变量，这些变量就是一些配置变量，在不同环境下可使用的变量。

```text
# 页面标题
VITE_APP_TITLE = 管理系统

# 开发环境配置
VITE_APP_ENV = 'development'

# 管理系统/开发环境
VITE_APP_BASE_API = '/'
```

## 环境

项目的运行不止在我们敲代码的时候，还在正式使用时等等，在这些情况我们区分为有本地环境、测试环境、预生产、生产环境等等。

在这不同环境下，代码运行的情况肯定是不一样的，这个时候就需要 env 文件，来控制其中变化的情况，实现差异性配置。


## env 命名

通常 env 文件命名如下：

- .env 所有环境(开发、测试、生成等）均会加载并合并该文件。
- .env.development 开发环境
- .env.production 生产环境

其中.env、.env.development、.env.production 文件的命名为固定格式，不能改变，否则读取不到文件。

## 文件读取

package.json  vue 中所需要的的依赖会根据该文件来安装。

- scripts：支持的脚本
- dependencies: 生产环境依赖包列表
- devDependencies: 开发环境、测试环境依赖包列表

而在 package.json 文件中 有 scripts字段用来定义脚本命令， Vue 会根据启动命令自动加载对应的环境配置文件。其中的属性是用来运行 npm run 命令的，属性名可以随意更改；而属性的值，才是真正运行的命令，是固定的。

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build --mode development",
    "build:pro": "vue-cli-service build --mode production",
    "build:test": "vue-cli-service build --mode test",
  },
```

## 配置环境变量

该文件注释用 # 号开头，定义变量直接是 属性 = 值。

```text
# 页面标题
VITE_APP_TITLE = 管理系统

# 环境配置
VITE_APP_ENV = 'development'

# api 基础路径
VITE_APP_BASE_API = '/dev-api'
// 或
VUE_APP_BASE_API = '/dev-api'
```

## 使用

我们知道了在不同环境下使用相应 env 文件中的变量，那么想要在项目中使用该变量要怎么做呢？

在项目中，如果我使用的是 vite ，要想在项目中使用变量的开头就需要是 VITE_，而不是 VITE_ 开头的变量就不能被获取到。

```js
// 在 vite 程序中获取
console.log(import.meta.env.VITE_APP_BASE_API); // /dev-api
// 在 vue2 项目中获取
console.log(process.env.VUE_APP_BASE_API); // /dev-api
```

在 vite 中对于不支持 import.meta.env来获取变量，我们可以使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件

```js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 如果当前环境是开发环境，则 mode 为 development
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_APP_BASE_API } = env // VITE_APP_BASE_API = /dev-api
  return {
    // vite 配置
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
```


