**1. 注册 npm 账号**

**2. 初始化项目**

新建test文件夹并进入，打开命令行窗口，在命令行窗口里面输入 npm init 初始化 package.json 文件。

创建package.json的步骤:

```text
01、package name: 设置包名，也就是下载时所使用的的命令，设置需谨慎。
02、version: 设置版本号，如果不设置那就默认版本号。
03、description: 包描述，就是对这个包的概括。
04、entry point: 设置入口文件，如果不设置会默认为index.js文件。
05、test command: 设置测试指令，默认值就是一句不能执行的话，可不设置。
06、git repository: 设置或创建git管理库。
07、keywords: 设置关键字，也可以不设置。
08、author: 设置作者名称，可不设置。
09、license: 备案号，可以不设置。
10、回车即可生成package.json文件，然后还有一行需要输入yes命令就推出窗口。
11、测试package.json文件是否创建成功的命令npm install -g。
```

**3. 创建index.js文件**

**4. 初始化package-lock.json文件**

在test根目录下使用npm link命令创建package-lock.json文件

**5. 登录npm账号**

使用 `npm login` 链接npm官网账号，此过程需要输入Username、Password和Email，需要提前准备好。连接成功会输出Logged in as [Username] on registry.npmjs.org/ 这句话，账号不同，输出会有不同。

**6. 发布包到npm服务器**

`npm publish`

**7. 步骤八发布包到npm服务器**

`npm install xxx`

**8. 更新包**

`npm version patch`，更新成功会输出版本号，版本号会自动加一，此更新只针对本地而言。

**9. 删除指定版本**

删除指定版本 `npm unpublish xxx@1.0.2`, 成功会输出删除的版本号，对应服务器也会删除。 

**10. 删除包**

`npm unpublish xxx`

**11. 强制删除包**

`npm unpublish xxx --force`

