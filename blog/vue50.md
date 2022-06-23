## Vue中扩展一个组件

> + 逻辑扩展有：mixins、extends、composition api；
>
> + 内容扩展有slots；

常见的组件扩展方法有：mixins，slots，extends等

**混入mixins：**

mixins是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

```js
// 复用代码：它是一个配置对象，选项和组件里面一样
const mymixin = {
   methods: {
      dosomething(){}
   }
}
// 全局混入：将混入对象传入
Vue.mixin(mymixin)

// 局部混入：做数组项设置到mixins选项，仅作用于当前组件
const Comp = {
   mixins: [mymixin]
}
```

**插槽slot：**

主要用于vue组件中的内容分发，也可以用于组件扩展。

子组件Child

```html
<div>
  <slot>这个内容会被父组件传递的内容替换</slot>
</div>
```

父组件Parent

```html
<div>
   <Child>来自老爹的内容</Child>
</div>
```

如果要精确分发到不同位置可以使用具名插槽，如果要使用子组件中的数据可以使用作用域插槽。

**extends：**

组件选项中还有一个不太常用的选项extends，也可以起到扩展组件的目的

```js
// 扩展对象
const myextends = {
   methods: {
      dosomething(){}
   }
}
// 组件扩展：做数组项设置到extends选项，仅作用于当前组件
// 跟混入的不同是它只能扩展单个对象
// 另外如果和混入发生冲突，该选项优先级较高，优先起作用
const Comp = {
   extends: myextends
}
```

混入的数据和方法**不能明确判断来源**且可能和当前组件内变量产生**命名冲突**，vue3中引入的 `composition api`，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据，然后在setup选项中组合使用，增强代码的可读性和维护性。例如：

```js
// 复用逻辑1
function useXX() {}
// 复用逻辑2
function useYY() {}
// 逻辑组合
const Comp = {
   setup() {
      const {xx} = useXX()
      const {yy} = useYY()
      return {xx, yy}
   }
}
```



## 子组件可以直接改父组件数据吗

所有的 prop 都使得其父子之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。另外，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不应该在一个子组件内部改变prop**。如果你这样做了，Vue 会在浏览器控制台中发出警告。

```js
const props = defineProps(['foo'])
// ❌ 下面行为会被警告, props是只读的!
props.foo = 'bar'
```

如果想要修改一个属性，可以定义一个本地data或者computed计算属性：

```js
// 定义一个本地的 data，并将这个 prop 用作其初始值
const props = defineProps(['initialCounter'])
const counter = ref(props.initialCounter)

// 使用 prop 的值来定义一个计算属性
const props = defineProps(['size'])
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

实践中如果确实想要改变父组件属性应该emit一个事件让父组件去做这个变更。



## Vue权限管理及按钮级权限

1. 权限管理一般需求是**页面权限**和**按钮权限**的管理

2. 具体实现的时候分后端和前端两种方案：

   前端方案会**把所有路由信息在前端配置**，通过路由守卫要求用户登录，用户**登录后根据角色过滤出路由表**。比如我会配置一个`asyncRoutes`数组，需要认证的页面在其路由的`meta`中添加一个`roles`字段，等获取用户角色之后取两者的交集，若结果不为空则说明可以访问。此过滤过程结束，剩下的路由就是该用户能访问的页面，**最后通过`router.addRoutes(accessRoutes)`方式动态添加路由**即可。

   后端方案会**把所有页面路由信息存在数据库**中，用户登录的时候根据其角色**查询得到其能访问的所有页面路由信息**返回给前端，前端**再通过`addRoutes`动态添加路由**信息

   按钮权限的控制通常会**实现一个指令**，例如 `v-permission`，**将按钮要求角色通过值传给v-permission指令**，在指令的 `moutned` 钩子中可以**判断当前用户角色和按钮是否存在交集**，有则保留按钮，无则移除按钮。

3. 纯前端方案的优点是实现简单，不需要额外权限管理页面，但是维护起来问题比较大，有新的页面和角色需求就要修改前端代码重新打包部署；服务端方案就不存在这个问题，通过专门的角色和权限管理页面，配置页面和按钮权限信息到数据库，应用每次登陆时获取的都是最新的路由信息，可谓一劳永逸！



## vue响应式的理解

1. 所谓数据响应式就是**能够使数据变化可以被检测并对这种变化做出响应的机制**。
2. MVVM框架中要解决的一个核心问题是连接数据层和视图层，通过**数据驱动**应用，数据变化，视图更新，要做到这点的就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理。
3. 以vue为例说明，通过数据响应式加上虚拟DOM和patch算法，开发人员只需要操作数据，关心业务，完全不用接触繁琐的DOM操作，从而大大提升开发效率，降低开发难度。
4. vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用**Object.defineProperty()**的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖数组对象原型的7个变更方法**，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新产生的Map、Set这些数据结构不支持等问题。
5. 为了解决这些问题，vue3重新编写了这一部分的实现：利用ES6的Proxy代理要响应化的数据，它有很多好处，编程体验是一致的，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，第三方的扩展开发起来更加灵活了。



## 虚拟 DOM 的理解

1. 虚拟dom顾名思义就是虚拟的dom对象，它本身就是一个 `JavaScript` 对象，只不过它是通过不同的属性去描述一个视图结构。

2. 通过引入vdom我们可以获得如下好处：

   **将真实元素节点抽象成 VNode，有效减少直接操作 dom 次数，从而提高程序性能**

   - 直接操作 dom 是有限制的，比如：diff、clone 等操作，一个真实元素上有许多的内容，如果直接对其进行 diff 操作，会去额外 diff 一些没有必要的内容；同样的，如果需要进行 clone 那么需要将其全部内容进行复制，这也是没必要的。但是，如果将这些操作转移到 JavaScript 对象上，那么就会变得简单了。
   - 操作 dom 是比较昂贵的操作，频繁的dom操作容易引起页面的重绘和回流，但是通过抽象 VNode 进行中间处理，可以有效减少直接操作dom的次数，从而减少页面重绘和回流。

   **方便实现跨平台**

   - 同一 VNode 节点可以渲染成不同平台上的对应的内容，比如：渲染在浏览器是 dom 元素节点，渲染在 Native( iOS、Android) 变为对应的控件、可以实现 SSR 、渲染到 WebGL 中等等
   - Vue3 中允许开发者基于 VNode 实现自定义渲染器（renderer），以便于针对不同平台进行渲染。

3. vdom如何生成？在vue中我们常常会为组件编写模板 - template， 这个模板会被编译器 - compiler编译为渲染函数，在接下来的挂载（mount）过程中会调用render函数，返回的对象就是虚拟dom。但它们还不是真正的dom，所以会在后续的patch过程中进一步转化为dom。

   ![image-20220209153820845](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80b653050433436da876459a26ab5a65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

4. 挂载过程结束后，vue程序进入更新流程。如果某些响应式数据发生变化，将会引起组件重新render，此时就会生成新的vdom，和上一次的渲染结果diff就能得到变化的地方，从而转换为最小量的dom操作，高效更新视图。





## diff算法

1. Vue中的diff算法称为patching算法，它由Snabbdom修改而来，虚拟DOM要想转化为真实DOM就需要通过patch方法转换。

2. 最初Vue1.x视图中每个依赖均有更新函数对应，可以做到精准更新，因此并不需要虚拟DOM和patching算法支持，但是这样粒度过细导致Vue1.x无法承载较大应用；Vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，此时就需要引入patching算法才能精确找到发生变化的地方并高效更新。

3. vue中diff执行的时刻是组件内响应式数据变更触发实例执行其更新函数时，更新函数会再次执行render函数获得最新的虚拟DOM，然后执行patch函数，并传入新旧两次虚拟DOM，通过比对两者找到变化的地方，最后将其转化为对应的DOM操作。

4. patch过程是一个递归过程，遵循深度优先、同层比较的策略；以vue3的patch为例：

    - 首先判断两个节点是否为相同同类节点，不同则删除重新创建
    - 如果双方都是文本则更新文本内容
    - 如果双方都是元素节点则递归更新子元素，同时更新元素属性
    - 更新子节点时又分了几种情况：
      - 新的子节点是文本，老的子节点是数组则清空，并设置文本；
      - 新的子节点是文本，老的子节点是文本则直接更新文本；
      - 新的子节点是数组，老的子节点是文本则清空文本，并创建新子节点数组中的子元素；
      - 新的子节点是数组，老的子节点也是数组，那么比较两组子节点，更新细节blabla

5. vue3中引入的更新策略：编译期优化patchFlags、block等





## vue3新特性

1. api层面Vue3新特性主要包括：Composition API、SFC Composition API语法糖、Teleport传送门、Fragments 片段、Emits选项、自定义渲染器、SFC CSS变量、Suspense

2. 另外，Vue3.0在框架层面也有很多亮眼的改进：
   - 更快
     - 虚拟DOM重写
     - 编译器优化：静态提升、patchFlags、block等
     - 基于Proxy的响应式系统
   - 更小：更好的tree-shaking优化
   - 更容易维护：TypeScript + 模块化
   - 更容易扩展
     - 独立的响应化模块
     - 自定义渲染器






## 定义动态路由

1. 很多时候，我们需要**将给定匹配模式的路由映射到同一个组件**，这种情况就需要定义动态路由。
2. 例如，我们可能有一个 `User` 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，例如：`{ path: '/users/:id', component: User }`，其中`:id`就是路径参数
3. *路径参数* 用冒号 `:` 表示。当一个路由被匹配时，它的 *params* 的值将在每个组件中以 `this.$route.params` 的形式暴露出来。
4. 参数还可以有多个，例如`/users/:username/posts/:postId`；除了 `$route.params` 之外，`$route` 对象还公开了其他有用的信息，如 `$route.query`、`$route.hash` 等。





## 实现一个vue路由的思路

一个SPA应用的路由需要解决的问题是**页面跳转内容改变同时不刷新**，同时路由还需要以插件形式存在，所以：

1. 首先我会定义一个 `createRouter` 函数，返回路由器实例，实例内部做几件事：
   - 保存用户传入的配置项
   - 监听hash或者popstate事件
   - 回调里根据path匹配对应路由
2. 将router定义成一个Vue插件，即实现install方法，内部做两件事：
   - 实现两个全局组件：router-link和router-view，分别实现页面跳转和内容显示
   - 定义两个全局变量：$route和$router，组件内可以访问当前路由和路由器实例





## key的作用

1. key的作用主要是为了更高效的更新虚拟DOM。
2. vue在patch过程中**判断两个节点是否是相同节点是key是一个必要条件**，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。
3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐蔽的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。
4. 从源码中可以知道，vue判断两个节点是否相同时主要判断两者的key和元素类型等，因此如果不设置key，它的值就是undefined，则可能永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。





## nextTick的使用和原理

+ nextTick是等待下一次 DOM 更新刷新的工具方法。

+ Vue有个异步更新策略，意思是如果数据变化，Vue不会立刻更新DOM，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用nextTick。

+ 开发时，有两个场景我们会用到nextTick：

  - created中想要获取DOM时；
  - 响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度。

+ nextTick如下：`function nextTick(callback?: () => void): Promise`

  所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以await nextTick()方法返回的Promise之后做这件事。

+ 在Vue内部，nextTick之所以能够让我们看到DOM更新后的结果，是因为我们传入的callback会被添加到队列刷新函数(flushSchedulerQueue)的后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，callback自然能够获取到最新的DOM值。





## 从0到1构架一个vue项目

1. 从0创建一个项目我大致会做以下事情：项目构建、引入必要插件、代码规范、提交规范、常用库和组件
2. 目前vue3项目我会用vite或者create-vue创建项目
3. 接下来引入必要插件：路由插件vue-router、状态管理vuex/pinia、ui库我比较喜欢element-plus和antd-vue、http工具我会选axios
4. 其他比较常用的库有vueuse，nprogress，图标可以使用vite-svg-loader
5. 下面是代码规范：结合prettier和eslint即可
6. 最后是提交规范，可以使用husky，lint-staged，commitlint
7. 目录结构我有如下习惯： `.vscode`：用来放项目中的 vscode 配置

    `plugins`：用来放 vite 插件的 plugin 配置

    `public`：用来放一些诸如 页头icon 之类的公共文件，会被打包到dist根目录下

    `src`：用来放项目代码文件

    `api`：用来放http的一些接口配置

    `assets`：用来放一些 CSS 之类的静态资源

    `components`：用来放项目通用组件

    `layout`：用来放项目的布局

    `router`：用来放项目的路由配置

    `store`：用来放状态管理Pinia的配置

    `utils`：用来放项目中的工具方法类

    `views`：用来放项目的页面文件



## 工作中vue最佳实践

1. 编码风格方面：
   - 命名组件时使用“多词”风格避免和HTML元素冲突
   - 使用“细节化”方式定义属性而不是只有一个属性名
   - 属性名声明时使用“驼峰命名”，模板或jsx中使用“肉串命名”
   - 使用v-for时务必加上key，且不要跟v-if写在一起
2. 性能方面：
   - 路由懒加载减少应用尺寸
   - 利用SSR减少首屏加载时间
   - 利用v-once渲染那些不需要更新的内容
   - 一些长列表可以利用虚拟滚动技术避免内存过度占用
   - 对于深层嵌套对象的大数组可以使用shallowRef或shallowReactive降低开销
   - 避免不必要的组件抽象
3. 安全：
   - 不使用不可信模板，例如使用用户输入拼接模板：`template:  + userProvidedString + `
   - 小心使用v-html，:url，:style等，避免html、url、样式等注入





## 从 template 到 render 处理过程

Vue中有个独特的编译器模块，称为“compiler”，它的主要作用是将用户编写的template编译为js中可执行的render函数。

之所以需要这个编译过程是为了便于前端程序员能高效的编写视图模板。相比而言，我们还是更愿意用HTML来编写视图，直观且高效。手写render函数不仅效率底下，而且失去了编译期的优化能力。

在Vue中编译器会先对template进行解析，这一步称为parse，结束之后会得到一个JS对象，我们成为抽象语法树AST，然后是对AST进行深加工的转换过程，这一步成为transform，最后将前面得到的AST生成为JS代码，也就是render函数。


Vue 3.0设计目标？做了哪些优化？

1. Vue3的最大设计目标是替代Vue2，为了实现这一点，Vue3在以下几个方面做了很大改进，如：易用性、框架性能、扩展性、可维护性、开发体验等；
2. 易用性方面主要是API简化，比如v-model在Vue3中变成了Vue2中v-model和sync修饰符的结合体，用户不用区分两者不同，也不用选择困难。类似的简化还有用于渲染函数内部生成VNode的h(type, props, children)，其中props不用考虑区分属性、特性、事件等，框架替我们判断，易用性大增；
3. 开发体验方面，新组件Teleport传送门、Fragments 、Suspense等都会简化特定场景的代码编写，SFC Composition API语法糖更是极大提升我们开发体验；
4. 扩展性方面提升如独立的reactivity模块，custom renderer API等；
5. 可维护性方面主要是Composition API，更容易编写高复用性的业务逻辑。还有对TypeScript支持的提升；
   性能方面的改进也很显著，例如编译期优化、基于Proxy的响应式系统。





**vue性能优化**

+ 主要从Vue代码编写层面说一些优化手段，例如：代码分割、服务端渲染、组件缓存、长列表优化等

+ 最常见的路由懒加载：有效拆分App尺寸，访问时才异步加载

  ```js
  const router = createRouter({
    routes: [
      // 借助webpack的import()实现异步组件
      { path: '/foo', component: () => import('./Foo.vue') }
    ]
  })
  ```

+ keep-alive缓存页面：避免重复创建组件实例，且能保留缓存组件状态

  ```html
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  ```

+ 使用v-show复用DOM：避免重复创建组件

  ```html
  <template>
    <div class="cell">
      <!-- 这种情况用v-show复用DOM，比v-if效果好 -->
      <div v-show="value" class="on">
        <Heavy :n="10000"/>
      </div>
      <section v-show="!value" class="off">
        <Heavy :n="10000"/>
      </section>
    </div>
  </template>
  ```

+ v-for 遍历避免同时使用 v-if：实际上在Vue3中已经是个错误写法

  ```vue
  <template>
      <ul>
        <li
          v-for="user in activeUsers"
          <!-- 避免同时使用，vue3中会报错 -->
          <!-- v-if="user.isActive" -->
          :key="user.id">
          {{ user.name }}
        </li>
      </ul>
  </template>
  <script>
    export default {
      computed: {
        activeUsers: function () {
          return this.users.filter(user => user.isActive)
        }
      }
    }
  </script>
  ```

+ v-once和v-memo：

  ```vue
  <!-- 不再变化的数据使用v-once -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- 按条件跳过更新时使用v-momo：下面这个列表只会更新选中状态变化项 -->
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```

+ 长列表性能优化：如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

+ 事件的销毁：Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

+ 图片懒加载

+ 第三方插件按需引入

+ 子组件分割策略：较重的状态组件适合拆分

+ 服务端渲染/静态网站生成：SSR/SSG




