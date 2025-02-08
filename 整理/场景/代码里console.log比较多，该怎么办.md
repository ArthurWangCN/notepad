
1. **ESLint配置规则软性禁止**：通过配置.eslintrc.json文件，添加"no-console": "warn"规则，使代码中使用console的地方会划上黄色波浪线警示，能一定程度削减console.log数量，但无法真正阻止其使用。
2. **git commit编写规则限制提交**：找到项目中的.git/hooks文件夹下的pre-commit.sample文件，将其内容修改为若提交代码中包含console.log则报错提交失败，并将文件重命名为pre-commit。但该规则可被git commit -m 'xxx' --no-verify指令绕过。
3. **依托于 cicd 的自动检测**: 在流水线部署的时候跑 eslint, 如果 console.log 代码增加， 就拒绝部署即可；
4. **使用插件删除**
    - VSCODE插件：可在插件商店搜索remove-console并安装，找到有console.log的文件使用插件删除，但效果可能不太理想。
    - Webpack插件：可使用terser-webpack-plugin，在项目基于create-react-app脚手架时可直接搜到，在使用处配置drop_console: true，能在打包后去除全部console.log。
  
---

补充：
  
**vite打包删除 console.log 和 debugger**：

vite 打包时压缩代码的方式有 esbuild 和 terser 两种

1. esbuild
    ```js
    import {defineConfig} from "vite";
    export default defineConfig({
        esbuild:{
            drop: ['console,'debugger'], // 删除 所有的console 和 debugger
        }
    })
    ```
2. terser

   vite 4.X 版本已经不集成 terser 了，所以想要使用 terser 进行代码压缩，要自行下载 terser（`npm i terser -D`）。
    ```js
    import {defineConfig} from "vite";
    export default defineConfig({
        build: {
            minify: 'terser', // 启用 terser 压缩
            terserOptions: {
                compress: {
                    drop_console: true, // 删除所有 console
                    drop_debugger: true,
                    
                }
            }
        }
    })
    ```
