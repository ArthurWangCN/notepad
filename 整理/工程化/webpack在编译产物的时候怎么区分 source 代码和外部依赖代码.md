# webpack在编译产物的时候怎么区分 source 代码和外部依赖代码

**1. 使用 Webpack 的optimize-module-ids插件（用于区分模块来源）**

原理：Webpack 在打包过程中会为每个模块分配一个唯一的module.id。optimize-module-ids插件可以帮助控制模块标识符的生成方式，使得能够根据模块是源文件还是外部依赖来区分它们。

配置步骤：

- 首先，安装optimize-module-ids插件（可能需要自行开发类似功能插件或寻找已有合适插件）。
- 然后，在 Webpack 配置文件中添加插件配置。例如：

```js
const CustomModuleIdsPlugin = require("optimize-module-ids");
module.exports = {
  //...其他配置
  plugins: [
    new CustomModuleIdsPlugin((module) => {
      if (module.resource && module.resource.includes("node_modules")) {
        return "external";
      } else {
        return "source";
      }
    }),
  ],
};
```

这个插件会依据模块的资源路径（module.resource）来判别模块是源自node_modules（外部依赖）还是其他源文件路径。若为外部依赖，模块的id会被标记为external，否则标记为source。如此一来，在最终的打包产物或构建信息里，就能通过这个id区分不同来源的模块。

**2. 通过构建工具的输出信息区分（适用于简单区分）**

查看构建日志：Webpack 在构建过程中会输出大量的日志信息。可在构建日志里查找模块的路径信息以区分源文件和外部依赖。比如，日志中来自src目录的模块通常是源文件，而来自node_modules目录的模块则是外部依赖。

分析统计信息（stats）：Webpack 提供了stats选项，可生成详细的构建统计信息。通过将stats配置为'verbose'或其他详细级别，能获取每个模块的路径、大小、依赖关系等信息。在这些信息中，可轻易识别出源文件和外部依赖。例如，配置stats如下：

```js
module.exports = {
  //...其他配置
  stats: "verbose",
};
```

之后便可通过分析生成的统计文件或在终端输出的详细统计信息来区分不同来源的模块。

**3. 自定义打包结构或命名规则（在输出阶段区分）**

分离输出目录：在 Webpack 的输出配置（output）中，可以设置不同的输出路径来分离源文件和外部依赖的打包产物。例如：

```js
module.exports = {
  //...其他配置
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (chunkData) => {
      if (chunkData.chunk.name.includes("external")) {
        return "external-bundles/[name].js";
      } else {
        return "source-bundles/[name].js";
      }
    },
  },
};
```

这里依据模块所属的chunk名称（可在构建过程中通过某些方式将模块所属的chunk标记为external或source），把外部依赖和源文件分别打包到不同的目录（external-bundles和source-bundles）下，这样在最终的打包产物中就能很直观地进行区分。

命名规则：除了分离输出目录，还可通过命名规则来区分。例如，在输出文件名中添加前缀以表示模块来源，如source-[name].js和external-[name].js，如此在查看打包文件时就能快速识别模块来源。
