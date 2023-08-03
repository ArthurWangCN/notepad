> 问题描述：vite 打包 npm lib库，直接引入组件不包含css。

Vite 在2.0版本提供了Library Mode（库模式），让开发者可以使用Vite来构建自己的库以发布使用。在开发完成后进行打包，出现了三个文件：

```
dist/style.css
dist/index.es.js;
dist/index.umd.js
```

其中的style.css文件里面包含了该组件的所有样式，如果该文件单独出现的话，意味着在使用时需要进行单独引入该样式文件，就像使用组件库时需在主文件引入其样式一样。

```js
import xxxComponent from 'xxx-component';
import 'xxx-component/dist/xxx.css'; // 引入样式
```

但我封装的只是单一组件，样式不多且只应用于该组件上，没有那么复杂的样式系统。

所以打包时比较好的做法是配置构建工具将样式注入到JS文件中，从而无需再多一行引入语句。我们知道Webpack打包是可以进行配置来通过一个自执行函数在DOM上创建style标签并将CSS注入其中，最后只输出JS文件，但在Vite的官方文档中似乎并没有告诉我们怎么去配置。

让我们先来看一下官方提供的配置：

```js
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

首先要开启build.lib选项，配置入口文件和文件名等基本配置，由于Vite生产模式下打包采用的是rollup，所以需要开启相关选项，当我们的库是由Vue或React编写的时候，使用的时候一般也是在该环境下，例如我的这个组件是基于React进行编写，那么使用时无疑也是在React中进行引入，这样就会造成产物冗余，所以需要在external配置中添加上外部化的依赖，以在打包时给剔除掉。output选项是输出产物为umd格式时（具体格式查看build.lib.formats选项，umd为Universal Module Definition，可以直接script标签引入使用，所以需要提供一个全局变量）。

配置完上述提及到的后，我接着寻找与打包样式相关的内容，然而并没有发现。。

没关系，我们还可以去仓库issues看看，说不定有人也发现了这个问题。搜索后果不其然，底下竟有高达47条评论：

https://link.zhihu.com/?target=https%3A//github.com/vitejs/vite/issues/1579

点进去后，提问者问到如何才能不生成CSS文件，尤回答说：进行样式注入的DOM环境会产生服务端渲染的不兼容问题，如果CSS代码不多，使用行内样式进行解决。

这个回答显然不能让很多人满意（这可能是该issue关闭后又重新打开的原因），因为带样式的库在编写过程中几乎不会采用行内的写法，提问者也回复说道那样自己就不能使用模块化的Less了，依旧希望能够给出更多的库模式options，然后下面都各抒己见，但都没有一种很好的解决方案被提出。

解决方案：
1. 在配置的时候加上 `cssCodeSplit: false`；
2. 如果上面不生效，可以安装 `vite-plugin-libcss` 插件，这个插件会在打包出来的 xxx.js  的第一行自动加上 `import style.css`。

参考：

- https://www.zhihu.com/question/470701634
- https://github.com/wxsms/vite-plugin-libcss/blob/master/index.js
- https://segmentfault.com/a/1190000042278132
- https://blog.csdn.net/exxes/article/details/125520427
