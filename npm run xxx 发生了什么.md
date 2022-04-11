# npm run xxx 发生了什么

以 `npm run serve` 为例，运行时对 package.json 进行解析，运行该json文件中 scripts 下的 **serve** 对应的命令：

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},
```

即运行 `vue-cli-service serve`。



npm 在运行 vue-cli-service serve 这条命令时，会先在当前 **node_modules/.bin** 下面看有没有同名的可执行文件，如果有，则运行。

```shell
# node_modules/.bin
vue-cli-service
vue-cli-service.cmd
vue-cli-service.ps1
```



这几个文件的来历：

当运行 npm i @vue/cli-service 这条命令，npm就会在 node_modules/.bin 目录中创建好以 vue-cli-service 为名的几个可执行文件。



如果我们在 cmd 里运行的时候，windows 一般调用 `vue-cli-service.cmd`：

```shell
@ECHO off
SETLOCAL
CALL :find_dp0

IF EXIST "%dp0%\node.exe" (
  SET "_prog=%dp0%\node.exe"
) ELSE (
  SET "_prog=node"
  SET PATHEXT=%PATHEXT:;.JS;=;%
)

"%_prog%"  "%dp0%\..\@vue\cli-service\bin\vue-cli-service.js" %*
ENDLOCAL
EXIT /b %errorlevel%
:find_dp0
SET dp0=%~dp0
EXIT /b
```



所以当我们运行 `vue-cli-service serve` 这条命令的时候，就相当于运行  `node_modules/.bin/vue-cli-service.cmd serve`。

然后这个脚本会使用 node 去运行  `vue-cli-service.js`  这个 js 文件，由于 node 中可以使用一系列系统相关的 api ，所以在这个 js 中可以做很多事情，例如读取并分析运行这条命令的目录下的文件，根据模板生成文件等。



```shell
# unix 系默认的可执行文件，必须输入完整文件名
vue-cli-service

# windows cmd 中默认的可执行文件，当我们不添加后缀名时，自动根据 pathext 查找文件
vue-cli-service.cmd

# Windows PowerShell 中可执行文件，可以跨平台
vue-cli-service.ps1
```



vue-cli-service.js：

```js
#!/usr/bin/env node

const { semver, error } = require('@vue/cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion, { includePrerelease: true })) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const Service = require('../lib/Service')
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
```

