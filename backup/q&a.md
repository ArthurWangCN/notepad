## JavaScript

**Map和Set的区别，Map和Object的区别**

- Map是一组键值对的结构，具有极快的查找速度。
- Set 对象类似于数组，且成员的值都是唯一的。

Map和Set区别：

1.  初始化需要的值不一样，Map需要的是一个二维数组，而Set 需要的是一维 Array 数组
2. Map 是键值对的存在，值也不作为健；而 Set 没有 value 只有 key，value 就是 key；
3. Map的键是不能修改，但是键对应的值是可以修改的；Set不能通过迭代器来改变Set的值，因为Set的值就是键。

Map和Object区别：

1. Object的键只能是字符串或者Symbol，而Map的键可以是任意值。
2. Map中的键值是有序的（FIFO），而Object中的键是无序的。
3. Map中的键值个数可以从size属性中获取，而Object中的键值只能手动获取。

**数组的filter、every、flat的作用是什么**

- filter：对数组进行过滤，创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
- every：对数组中每一项运行给定函数，如果该函数对每一项返回true,则返回true。
- flat：按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**es6有哪些新特性**

1、变量声明 let const  2、模板字符串  3、箭头函数  4、解构赋值  5、扩展运算符  6、类class  7、参数默认值  8、for of  9、promise  10、async/await  11、Symbol  12、Set集合 13、块级作用域  14、模块

**说一下对Promise的了解**

- promise是异步编程的一种方案，解决了地狱回调的问题，是一种链式调动的方式

- Promise 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

- promise 是一个对象，从它可以获取异步操作的的最终状态（成功或失败）。

- Promise是一个构造函数，对外提供统一的 API，自己身上有all、reject、resolve等方法，原型上有then、catch等方法。

Promise的all和race有什么区别

**箭头函数和普通函数的区别**

1. 外形不同：箭头函数使用箭头定义，普通函数中没有。
2. 箭头函数全都是匿名函数；普通函数可以有匿名函数，也可以有具名函数。
3. 箭头函数不能用于构造函数；普通函数可以用于构造函数，以此创建对象实例。
4. 箭头函数中 this 的指向不同，箭头函数本身没有this，但是它在声明时可以捕获其所在上下文的this供自己使用；在普通函数中，this 总是指向调用它的对象，如果用作构造函数，它指向创建的对象实例。
5. 普通函数的参数是arguments，而箭头函数的的是args。
6. 其他区别：箭头函数不具有 prototype 原型对象。箭头函数不具有 super。

**let、var和const的区别**

1. let和var声明的是变量，声明之后可以更改，声明时可以不赋值；
2. const声明的是常量，必须赋值；
3. var允许重复声明变量，let、const不允许；
4. var存在变量提升，let、const不存在；
5. let、const存在块级作用域，var不存在。

**如果希望const定义的对象的属性也不能被修改该怎么做**

使用 `Object.freeze(obj)` 冻结obj，就能使其内部的属性不可变，但有局限，就是obj对象中要是有属性是对象，该对象内属性还能改变，要全不可变的话，就需要使用递归等方式一层一层全部冻结。

**堆和栈的区别**

- 栈(stack): 由操作系统自动分配内存空间，自动释放，存储的是基础变量以及一些对象的引用变量，占据固定大小的空间。
- 堆(heap)： 由操作系统动态分配的内存，大小不定也不会自动释放，一般由程序员分配释放，也可由垃圾回收机制回收。

**闭包的原理**

一个函数和对其周围状态（词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

闭包实现原理，其实是利用了作用域链的特性。

示例：

```js
function addAge(){
	var age = 21;
	return function(){
		age++;
		console.log(age);
	}
}
var clourse = addAge();
clourse();
clourse();
clourse();
```

addAge入栈，会为本次函数调用创建活动对象AO（包含age变量），closure变量记录下addAge返回的函数地址。addAge调用完毕出栈，对活动对象AO的引用也消失了，按理说AO会被回收掉。

但是，closure记录了addAge返回的匿名函数function的地址，匿名函数的scope指向活动对象AO，导致AO无法释放。

**instanceof的实现原理**

>  instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

通俗理解就是：instanceof 是一个运算符，它可以用来判断某一个对象的类型，具体原理就是利用了原型和原型链。

判断数据类型并不是 instanceof 最准确的说法，它主要是用来判断实例对象与构造函数之间的关系的。

instanceof原理就是利用**原型和原型链**！ 我们都知道每一个函数都有一个显式原型 prototype，每一个对象都有一个隐式原型`__proto__`，当我们对象的原型链中存在构造函数的显式原型 prototype 时，我们就可以确定它们之间时存在关系的。

更直观的：

- 我们拿到 instanceof 左侧对象的原型链
- 再拿到 instanceof 右侧构造函数的显式原型 prototype
- 如果原型链中存在显式原型 prototype，instanceof 返回 true，否则返回 false

手写：

```js
function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;
    while(true) {
        if (!proto) return false;
        if (proto === prototype)  return true;
        proto = Object.getPrototypeOf(proto);
    }
}
```

与typeof对比：

- typeof：主要用来判断基础数据类型，比如：Number、String 等等。
- instanceof：主要用来判断对象数据类型，比如 Function、Array 等等。
- typeof 直接返回数据类型，而 instanceof 重在判断，它返回布尔值。

https://developer.aliyun.com/article/975547

**new的实现原理**

new关键字创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例，可以理解为就是执行一个构造函数，返回一个实例对象。

1. 创建一个新对象
2. 对象连接到构造函数原型上，并绑定 `this`（this 指向新对象）
3. 执行构造函数代码（为这个新对象添加属性）
4. 返回新对象

手写：

```js
function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        throw 'fn must be a function'
    }
    let obj = Object.create(fn.prototype)
    let res = fn.apply(obj, [...args])
    return res instanceof Object ? res : obj
}
```

**数据类型有哪些？如何判断一个数据是否是数组**

string、number、boolean、null、undefined、object、symbol、bigint

判断是否为数组：

1. xxx instanceof Array
2. Array.isArray(xxx)
3. Object.prototype.toString.call(xxx)   [object Array]
4. xxx.constructor === Array
5. Array.prototype.isPrototypeOf(xxx)
6. Object.getPrototypeOf(xxx) === Array.prototype
7. `xxx.__proto__` === Array.prototype

**JQuery实现链式调用的原理是什么**

链式调用本质是返回本身对象实例（this），因此，对象实例可以继续调用其属性方法。

**分别介绍一下原型、原型链、作用域和作用域链的含义和使用场景**



## CSS

**css和js两种方式实现div右移1000px动画**

css: transform: translateX(1000px)

js: box.style.transform = 'translateX(1000px)'

**visibility、display、opacity的区别**

- display：不占位，无事件
- visibility：占位，没有渲染到页面中，不具有事件能力
- opacity：只是透明度，占位，有事件能力

**单行截断css**

```css
overflow: hidden; // 超出隐藏
text-overflow: ellipsis; //超出用省略号
white-space: nowrap; // 不换行
```

**flex布局**

Flex是Flexible Box的缩写 flex布局表示弹性布局，可以为盒状模型提供最大的灵活性。

**flex：1**

flex:1实际代表的是三个属性的简写

- flex-grow是用来增大盒子的，比如，当父盒子的宽度大于子盒子的宽度，父盒子的剩余空间可以利用flex-grow来设置子盒子增大的占比
- flex-shrink用来设置子盒子超过父盒子的宽度后，超出部分进行缩小的取值比例
- flex-basis是用来设置盒子的基准宽度，并且basis和width同时存在basis会把width干掉

所以flex：1；的逻辑就是用flex-basis把width干掉，然后再用flex-grow和flex-shrink增大的增大缩小的缩小，达成最终的效果。

**transition、transform、translate的区别**

- transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等。
- translate是transform的一个属性，表示2D平移，正数表示向右和向下，负数表示向左和向上
- transition是过渡动画，CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。

**如何画一条 0.5px 的边框**

1. border-width: 0.5px;

2. 用阴影代替边框，设置阴影box-shadow: 0 0 0 .5px #000;

3. ```js
   .box {
       position: relative;
       width: 200px;
       height:200px;
       border-radius: 4px;
   }
   .box::after {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 200%;
       height: 200%;
       border-radius: 8px;
       border: 1px solid #ccc;
       transform: scale(.5);
       transform-origin: 0 0 ;
       pointer-events: none;
   }
   ```

**说一下BFC**

BFC（Block Formatting Context）块格式化上下文，就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。

出发条件：

1. 浮动元素，float 除 none 以外的值； 
2. 定位元素，position（absolute，fixed）； 
3. display 为以下其中之一的值 inline-block，table-cell，table-caption； 
4. overflow 除了 visible 以外的值（hidden，auto，scroll）；

**parent元素宽高不定，实现scale固定宽高比始终为4：3**

利用padding-top或者padding-bottom的百分比值，实现容器长宽比。在CSS中padding-top或padding-bottom的百分比值是根据容器的width来计算的。如此一来就很好的实现了容器的长宽比。

采用这种方法，需要把容器的height设置为0。而容器内容的所有元素都需要采用position:absolute，不然子元素内容都将被padding挤出容器（造成内容溢出）。

比如我们容器的长宽比是16:9，那么根据计算：100% * 9 / 16 可以得到 56.25%。如果你希望的是4:3，那么对应的就是100% * 3 / 4。

**CSS垂直居中的方案**

1. 定位 + transform
2. 定位 + 负margin
3. flex
4. table-cell

**伪元素和伪类的区别**

1. 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；伪元素本质上是创建了一个有内容的虚拟容器；
2. CSS3中伪类和伪元素的语法不同；   伪类  :link  :hover         伪元素  ::before    ::after
3. 可以同时使用多个伪类，而只能同时使用一个伪元素；
4. 其中伪类和伪元素的根本区别在于：它们是否创造了新的元素,,   这个新创造的元素就叫  "伪无素" 。

:before 和 ::before：:before/:after是CSS2的写法，::before/::after是CSS3的写法，CSS2的要比CSS3的兼容好。

**position的几个属性和含义**

1. static：默认位置
2. relative：以它原来的位置为基准偏移，移动后的元素在原来的位置仍占据空间。
3. absolute：相对于它设置了 position 属性的父容器偏移，在标准流中不占位置。
4. fixed：相对于浏览器窗口的定位，在标准流中不占位置。

**说一下盒模型**

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。

分为IE盒模型和标准盒模型，通过box-sizing触发。

**响应式布局方案**

1. 百分比布局
2. rem布局
3. flex布局
4. 媒体查询 @media
5. vw 和 vh

**三栏式布局方案**

flex、position、float

**如何提高动画的渲染性能**

1. 精简 DOM ，合理布局;
2. 使用 transform 代替 left、top，减少使用耗性能样式；
3. 控制频繁动画的层级关系（尽量让需要进行 CSS 动画的元素的 z-index 保持在页面最上方，避免浏览器创建不必要的图形层）；
4. requestAnimationFrame 。



## 框架通识

**React-router、vue-router原理**

- Hash模式：hash模式是在地址后面拼接一个 # 号后面带有的路由地址，就类似于 a 标签的锚点。浏览器地址栏 hash 值改变并不会触发浏览器请求，而是触发 hashchange 事件。
- History模式：利用ES6中的新增BOM对象History，History 存储历史记录是 队列存储 的，也可以理解为一个数组。replaceState 和 pushState 其实就是vue中的 replace 和 push ，不过就是将其再进行了封装罢了

**vue和 react 的区别**

1. 监听数据变化的实现原理不同：Vue通过getter/setter进行劫持；React默认通过比较引用的方式。原因是Vue使用的是可变数据，而React强调数据不可变，没有好坏之分，Vue更加简单，React构建大型应用鲁棒性更好。
2. 数据流不同：Vue组件与DOM是双向绑定，React一直不支持双向绑定，提倡的是单向数据流。
3. HoC和mixins：Vue组合不同功能的方式是通过mixin，React组合不同功能的方式是通过HoC(高阶组件）。
4. 模板渲染方式的不同：React是通过JSX渲染模板，而Vue是通过一种拓展的HTML语法进行渲染。

Vue的优势包括：

- 模板和渲染函数的弹性选择
- 简单的语法及项目创建
- 更快的渲染速度和更小的体积

React的优势包括：

- 更适用于大型应用和更好的可测试性
- 同时适用于Web端和原生App
- 更大的生态圈带来的更多支持和工具

**vue和 react 如何做技术选型**

- 应用需要尽可能的小和快就用vue，vue渲染速度比react快
- 大型项目建议用react，因为vue模板的使用不容易发现错误、也不易拆分和测试
- 如果要适用于web和原生app的项目，就使用react native

**css module原理**

css作用域是全局的，任何一个组件的样式，对整个页面都有效。产生局部作用域的唯一方法是使用唯一的类名，这就是css modules的工作原理。

css-modules 是 css-loader 支持的方案，在 vue、react 中都可以用，它是通过编译的方式修改选择器名字为全局唯一的方式来实现 css 的样式隔离。

scoped 是 vue-loader 支持的方案，它是通过编译的方式在元素上添加了 data-xxx 的属性，然后给 css 选择器加上[data-xxx] 的属性选择器的方式实现 css 的样式隔离。

**说一下虚拟DOM？为什么要使用虚拟DOM？（追问：虚拟DOM是如何合并patch的）**

虚拟DOM是对真实DOM的抽象，它表现为一个JavaScript对象，该对象的属性存储了某个节点所包含的信息，如标签名、标签用到的HTML属性、子元素对象等，来描述一个DOM元素。

每次页面重新渲染时，会先使用VNode类去实例化不同类型的DOM节点，生成vnode实例，然后与上一次渲染视图时缓存的vnode进行对比，找出不同的地方，基于此去局部修改真实DOM，这里新旧两个vnode的对比使用了Diff算法。

好处：

- 虚拟DOM本质上是使用了JavaScript的运算成本来替换直接操作DOM元素的成本，因为DOM操作的执行速度是很慢的，远不如JavaScript的运算速度。
- 另外，虚拟DOM还有一个优势就是跨平台能力。将真实DOM映射为JavaScript对象，可以使代码不仅仅局限于对浏览器DOM的操作，只要支持JavaScript即可使用。

虚拟DOM最核心的部分是patch，它可以将vnode渲染成真实的DOM。patch不是暴力替换节点，而是在现有DOM上进行修改来达到渲染视图的目的。对现有DOM进行修改需要做三件事：

1. 创建新增的节点
2. 删除已经废弃的节点
3. 修改需要更新的节点

**map 和 v-for 中 key 的作用**

v-for中key的作用主要是为了高效的更新虚拟DOM,使用key来给每一个节点做一个唯一标识，diff算法可以正确的识别此节点,找到正确的位置对此节点进行操作。

**react diff算法和vue diff算法的区别**

共同点：vue和diff算法，都是不进行跨层级比较，只做同级比较

不同点：

1. vue进行diff时，调用patch打补丁函数，一边比较一边给真实的dom打补丁，vue对比节点时，当节点元素类型相同，类名不同时，认为是不同的元素，删除重新创建，而react认为是同类型的节点，进行修改操作

2. vue列表对比的时候，采用从两端到中间的方式，旧集合和新集合两端各存在两个指针，两两进行比较，每次对比结束后，指针向队列中间移动；react则是从左往右一次对比，利用元素的index和lastindex进行比较

3. 当一个集合把最后一个节点移动到最前面，react会把前面的节点依次向后移动，而Vue只会把最后一个节点放在最前面，这样的操作来看，Vue的diff性能是高于react的

**组件通信的方式有哪些**



**SPA单页面应用和多页面应用有什么区别**

- 单页面应用：公共资源加载一次，页面切换快，页面局部刷新，适用于对体验度和流畅度要求高的场景，不利于SEO；
- 多页面应用：每个页面公共资源都需要加载一次，页面切换慢，体验较差，但是有理由SEO。





## Vue

**computed和watch的区别**

- computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
- computed有缓存
- computed默认第一次加载的时候就开始监听；watch默认第一次加载不做监听，如果需要第一次加载做监听，添加immediate属性，设置为true

**data为什么是个函数，而不是对象**

vue组件可能会有很多个实例，采用函数返回一个全新data形式，使每个实例对象的数据不会受到其他实例对象数据的污染

**watch能监听computed的属性吗**

watch是属性监听器,一般用来监听属性的变化(也可以用来监听计算属性函数)并做一些逻辑

**vue的响应式原理**

当一个Vue实例创建时，Vue会遍历 data 中的属性，用 Object.defineProperty（vue3.0使用proxy ）将它们转为 getter/setter，并且在内部追踪相关依赖，在属性被访问和修改时通知变化。

每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

**vue的生命周期**



**mounted拿到数据可以后可以直接获取dom吗**



**nextTick原理**

 nextTick作用：在下次DOM更新循环结束之后执行的延迟回调

首先nextTick并不是浏览器本身提供的一个异步API，而是Vue中，用过由浏览器本身提供的原生异步API封装而成的一个异步封装方法。

它对于浏览器异步API的选用规则如下，Promise存在取由Promise.then，不存在Promise则取MutationObserver，MutationObserver不存在setImmediate，setImmediate不存在最后取setTimeout来实现。


nextTick即有可能是微任务，也有可能是宏任务，从优先去Promise和MutationObserver可以看出nextTick优先微任务，其次是setImmediate和setTimeout宏任务。




**vue模板（template）里为什么不能使用多个头结点？**

保证了内部的内容有效但不会被渲染。vue-cli 本质上是会把 .vue 文件经过 webpack 配置打包成一系列的 js/css 文件注入到一个 html 文件中交给浏览器进行解释执行。

这也就是说，每一个 .vue 文件都会是一个 Vue 的实例，而 <template> 标签中的内容就是 Vue 实例接管造成虚拟 DOM 的那部份内容。若是在 template 下有多个 div，那么虚拟 DOM 树就没办法生成了。

1. 从查找和遍历的角度来讲，若是有多个根，那么咱们的查找和遍历的效率会很低。
2. 若是一个树有多个根，说明能够优化，确定会有一个节点是能够访问到全部的节点，那这个节点就会成为新的根节点。
3. 再从 Vue 自己来讲，若是说一个组件有多个入口多个根，那不就意味着你的组件还能够进一步拆分红多个组件，进一步组件化，下降代码之间的耦合程度。

**vuex为什么同时设计mutation和action？只设计一个行不行？**

区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。

事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutations 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutations 必须是同步的这一点。

同步的意义在于这样每一个 mutations 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。

**vue2和 vue3 在数据绑定这一块有什么区别？**

Vue2 使用Object.definedProperty()进行数据劫持，结合发布订阅方式。

- 缺点：只能劫持对象的属性；只能监听到对象属性已有数据是否被修改；无法监听到对象属性的新增和删除；无法监听到数组的一些变化（改下标之类的）。

Vue3使用Proxy代理，使用ref 或者reactive 将数据转化为响应式数据。

- 优点：可以劫持整个对象；可以劫持属性的访问新增删除；多层嵌套也可以；可以监听数组变化
- 缺点：兼容性问题

https://blog.csdn.net/anr_safely/article/details/125936820

**vue挂载和卸载父子组件生命周期钩子执行顺序**

**vue的优化方案（等同于如何编写可读性高、易维护且高性能的vue代码）**

按需加载UI组件库 、删除没用的依赖、删除无用的console、处理打包后的sourcemap、首屏加载优化、按需加载

**keep-alive的原理，使用有什么问题？如何解决？**

keep-alive是Vue中内置的一个抽象组件。它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

当引入keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。

Vue.js内部将DOM节点抽象成了一个个的VNode节点，keep-alive组件的缓存也是基于VNode节点的而不是直接存储DOM结构。它将满足条件（pruneCache与pruneCache）的组件在cache对象中缓存起来，在需要重新渲染的时候再将vnode节点从cache对象中取出并渲染。

https://blog.csdn.net/weixin_43804496/article/details/125523619



## React

- setState是同步还是异步的
- fiber的实现原理
- fiber的时间调度通过哪两个原生api实现的（requestAnimationFrame和requestIdleCallback？？？）
- React合成事件是如何实现的
- 使用Redux时需要注意的点
- 如果Redux没返回新的数据会怎样
- Redux是如何派发数据的？ connect原理？
- 什么场景会触发重新渲染（re-render）
- setState返回一样的引用，render会执行吗
- useEffect的使用方法？useEffect的return会在什么时候执行？useEffect原理是什么？
- useMemo和useCallback的区别，它们的实现原理是什么？
- useEffect、useMemo、useCallback是如何做依赖收集的
- React Hooks有什么优势和劣势
- context的实现原理是什么？如何做依赖收集？
- React的生命周期（React15、React16）
- PureComponent和Component的区别
- 如果在map循环中没有设置key值，那么从 A B C D 四个节点变成 B C D三个节点，它会以什么样的方式变化
- React dom绑定事件和原生事件有什么区别
- 类组件和纯函数组件的区别
- Hooks的实现原理



## Webpack

**为什么webpack打包慢？为什么vite会比webpack快？如果想提高webpack速度，应该怎么做？**

- webpack开发构建的时候，他会默认构建你的所有页面，抓取整个应用以后提供服务，这就会导致，在你的项目中任何一个地方有一个错误（尽管你当前还未进入这个页面），这都会影响构建速度，因此你的项目越大，webpack构建时间就越长，启动速度就越慢。
- vite并不会在一开始就构建你的项目，而是会把应用分为【依赖】和【源码】，对于源码部分 他会根据【路由】来进行拆分，只构建一开始就必须构建的内容，同时vite以【原生ESM】的方式为浏览器提供源码，让浏览器承担了部分打包的工作，也正是因为这样的机制，不管你的项目有多大，他会先构建一开始必须要构建的内容，因此大大提升了构建的速度。

提高webpack速度：

1. 多入口情况下，使用CommonsChunkPlugin来提取公共代码；
2. 通过externals配置来提取常用库
3. 利用DllPlugin和DllReferencePlugin预编译资源模块
4. 使用Happypack 实现多线程加速编译
5. 使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。
6. 使用Tree-shaking和Scope Hoisting来剔除多余代码

**说说webpack编译打包的流程**

1. 初始化参数阶段：从我们配置的`webpack.config.js`中读取到对应的配置参数和`shell`命令中传入的参数进行合并得到最终打包配置参数。
2. 开始编译准备阶段：这一步我们会通过调用webpack()方法返回一个compiler方法，创建我们的compiler对象，并且注册各个Webpack Plugin。找到配置入口中的entry代码，调用compiler.run()方法进行编译。
3. 模块编译阶段：从入口模块进行分析，调用匹配文件的loaders对文件进行处理。同时分析模块依赖的模块，递归进行模块编译工作。
4. 完成编译阶段：在递归完成后，每个引用模块通过loaders处理完成同时得到模块之间的相互依赖关系。
5. 输出文件阶段：整理模块依赖关系，同时将处理后的文件输出到ouput的磁盘目录中。

https://weibo.com/ttarticle/p/show?id=2309634737226558014172

**说一下对tree-shaking的了解，对CommonJS和ESM都可以用tree-shaking吗**

- 功能是移除 JavaScript 上下文中未引用的代码。
- 原理是依赖于 ES6 模块系统中的静态结构特性。即 import 和 export。

在 webpack 中使用 Tree-shaking 的三步：

1. 找到未使用的代码：模块必须使用 ES6 的 import 导入 和 export 导出，以此找出未使用的代码。
2. 标记无副作用：通过 package.json 的 sideEffects 属性来标记为"无副作用"，可以安全地删除。
3. 安全删除：引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。

ESM静态引入，编译时引入；Commonjs动态引入，执行时引入。

只有ESM才能静态分析，实现tree-shaking

**webpack中plugin和laoder的区别，它们的执行时机，以及常用的plugin和loader**

- loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
- plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事

运行时机上的区别：

- loader 运行在打包文件之前
- plugins 在整个编译周期都起作用

在Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的 API改变输出结果

对于loader，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程

https://www.yisu.com/zixun/458222.html

**css-loader的作用是什么？不使用css-loader行不行**

css-loader的作用是帮我们分析出各个css文件之间的关系，把各个css文件合并成一段css；

css-loader是必需的，它的作用是解析CSS文件，包括解析@import等CSS自身的语法。它的作用也仅仅是解析CSS文件，它会把CSS文件解析后，以字符串的形式打包到JS文件中。不过，此时的CSS样式并不会生效，因为我们需要把CSS插入到html里才会生效。



## Typescript

- Typescript相较于JavaScript有什么优势和劣势？

- const func = (a, b) => a + b; 要求编写Typescript，要求a，b参数类型一致，都为number或者都为string

- 实现ReturnType

- 实现DeepReadOnly

- 基于已有类型生成新类型：剔除类型中的width属性

  ```typescript
  interface A {
    content: string;
    width: number;
    height: number;
  }
  ```

  



## 浏览器/网络

- 介绍一下EventLoop
- EventLoop中为什么要同时存在宏任务和微任务两个队列？设计一个行不行？一段代码在执行时，程序是如何去区分宏任务和微任务的？
- 内存泄露
  - 项目中内存泄漏的场景
  - setTimeout为什么会造成内存泄露？如何防止setTimeout内存泄露？清除定时器为什么就不会有内存泄露？
- 介绍一下http缓存
  - 追问：哪些字段用做强缓存？哪些字段用做协商缓存？
  - 追问：cache-control、expires、etag等字段的属性值是什么样的？
  - 追问：这些字段都被存放在请求的哪个部分？
  - 追问：last-modify和expires这些字段的时间有什么区别？
  - 追问：last-modify和expires能共存吗？
  - 追问：如果不想让某个资源使用缓存，那么应该如何设计http缓存？
  - 追问：cache-control中的no-cache和no-store的区别
- 介绍一下宏任务和微任务
  - [【study】宏任务和微任务的区别是什么](https://juejin.cn/post/6880787856353132552)
  - 追问：哪些是宏任务？哪些是微任务？
  - 追问：宏任务和微任务的区别是什么？为什么要设计宏任务和微任务两个队列？使用一个任务队列行不行？为什么？
  - 追问：你刚刚所说的都是根据api来识别微任务和宏任务的，那么一段完整的程序浏览器是如何区分宏任务和微任务的呢？
- 微任务的优先级
- 如何理解script标签是个宏任务
- http1.1和http2的区别
- onload 和 DOMContentLoaded的区别
- requestAnimationFrame
- 浏览器加载页面的过程
- script标签为什么要放在底部
- defer和async的区别，以及它们的加载和执行时机
- DOM事件模型。事件捕获和事件冒泡的使用场景
- 从输入url到页面展示的过程
- 如何设计css、js等文件的缓存
- 204、304、404、504
- 描述一下同源策略、跨域及其解决方案
- xss和csrf的概念和防御方式
- sessionSorage、localstorage、cookie的区别？同一个系统开两个网页，两个网页的sessionStorage共享吗？
- http和https的区别？为什么https是相对安全的？https加密原理？
- tcp三次握手和四次挥手的步骤





## 小程序

- 说说小程序的三层架构
  - [微信小程序的架构以及为什么要用到双线程](https://juejin.cn/post/6923912179544489991)
  - 拆分逻辑层和渲染层有什么优势和劣势
- 小程序框架和普通H5框架的区别（比如Taro和RN）
- 小程序在安卓和iOS上的区别
- 为什么要用Taro？Taro是如何实现跨端的？
- Taro是如何兼容React和Vue的
- Taro3和Taro2的区别
- Taro的优化方案
- 小程序体积压缩的方案





## 看代码说结果

- EventLoop

  ```js
  setTimeout(function() {
  	console.log(1);
  }, 0);
  new Promise(function executor(resolve) {
    	console.log(2);
    	for (var i = 0; i < 10000; i++) {
      		resolve();
    	}
    	console.log(3);
  }).then(function() {
    	console.log(4);
  });
  console.log(5);
  ```

- 闭包。说结果，然后分别使用Promise和async改写成每隔1s打印1个数字的形式

  ```js
  function print(n){
      for(var i = 0;i <n;i++){
          setTimeout(console.log, 1000, i);
      }
  }
  print(10);
  ```

- 作用域

  ```js
  var a = 20;
  
  function bar() {
    console.log(a);
  }
  
  function foo(fn) {
    var a = 10;
    fn();
  }
  
  foo(bar);
  ```

- 作用域

  ```js
  function bar() {
    var a = 20;
    return function() {
      console.log(a);
    }
  }
  
  var foo = bar();
  var a = 10;
  foo();  // 20
  ```

- 作用域

  ```js
  var a = 20;
  
  function bar() {
    console.log(a)
    var a = 10;
    console.log(n)
  }
  bar()
  ```

- EventLoop

  ```js
  const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve(5);
    console.log(2);
  }).then((res) => {
    console.log(res);
  })
  
  promise.then(() => {
    console.log(3);
  })
  
  console.log(4)
  
  setTimeout(() => {
    console.log(6)
  })
  ```

- EventLoop

  ```js
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  
  async function async2() {
    console.log('async2 start');
  }
  
  console.log('script start');
  
  setTimeout(function() {
    console.log('setTimeout');
  }, 0);
  
  async1();
  
  new Promise(function(resolve) {
    console.log('promise1');
    resolve();
  }).then(function() {
    console.log('promise2');
  }).then(function() {
    console.log('promise3');
  });
  
  console.log('script end');
  ```

- 原型链

  ```js
  function foo() {
  
  }
  
  const bar = new foo()
  
  console.log(bar.__proto__)
  console.log(bar.__proto__.__proto__)
  console.log(bar.__proto__.__proto__.__proto__)
  console.log(bar.__proto__.__proto__.__proto__.__proto__)
  console.log(foo.prototype)
  console.log(foo.prototype.prototype)
  console.log(foo.prototype.prototype.prototype)
  ```





## 手撕代码 & 算法

- 手写快排
- 手写深拷贝
- 手写节流和防抖
- 手写call / apply
- 手写Promise.all / Promise.race / Promise.allSettled
- 手写限制并发数量
- 手写括号匹配
- 手写红包算法（注意均衡分配和浮点数计算精度问题）
- 数组去重
- 将奇数排在前面，偶数排在后面。要求时间复杂度O(n)。空间复杂度O(1)（不能用splice）
- 数组转树结构
- 解析出URL中所有的部分
- 实现一个compare函数，比较两个对象是否相同
- 螺旋矩阵
- 大数相加
- 找出出现次数最多的英语单词
- 节点倒序（将ul.id=list，将ul节点下的10000个li节点倒序。考虑性能。）
- 实现一个函数计算 "1+12-31+100-93"
- 判断链表是否有环
- 手写useReducer
- 手写useDidMount
- 手写useDidUpdate，模拟componentDidUpdate
- 手写usePrevious
- 爬楼梯
- 删除单向链表中的某个节点
- 柯里化
- 中划线转大写
- 千位分割
- 使用es5实现es6的let关键字





## 开放题

- Antd栅格布局的实现
- 劫持所有的a标签，点击时不发生跳转，而是弹出提示框提示即将跳转到某个网址，点击确认则跳转，点击取消则无操作
- 两个promise，分别实现串行和并行形式，只有两个promise都返回结果时打印success，否则打印fail
- 长列表的优化方案有哪些？如何设计一个虚拟列表
- 埋点是如何拦截和上报的
- 如何实现一个无埋点数据上报
- 使用**hash**路由时，怎么能再刷新后时候自动滚动到页面上次的锚点位置？
- 做过哪些性能优化方面的工作
- 实现一个多级菜单，菜单层级不定
- 如何监控和排查内存泄漏问题
- 模拟实现Java中的sleep函数
- 使用var模拟实现es6中的let和const
- 实现一个数组的splice方法（说思路）
- A页面跳转到B页面，在B页面做的操作传输给A页面的方法
- Sentry是如何实现错误监控的
- 将一个GIF绘制到canvas上是否可行？如果可行，说说你的实现方法。
- 如果让你搭建一个项目，你会使用哪些技术方案进行组合？
- 如何做技术选型？
- 手写实现一个图片懒加载
- 编写一个函数，传入一个promise和数字n，n(s)内promise没有返回结果，直接reject
- 了解SSR吗
- 说一下深拷贝要注意的点
- 前端发展方向设想
- 如何设计一个类似于elementui这样的可以单包发布，也可以多包发布的框架
- 如果让你设计一个单测框架，你怎么设计？
- 如何实现模块懒加载？import语法是如何做的
- 如何设计一个单点登录方案？
- 用过哪些设计模式？分别说说它们的使用场景和应用案例？你觉得使用设计模式给你带来了什么好处？
- 从A页面跳转到B页面，再返回A页面时，如何让A页面保持上一次的状态
- 了解Vue3和React18吗
- Nginx和node中间件代理的区别
- Node中间件主要是解决什么问题
- 说一下你做过的最有收获的项目。描述一下系统所承载的功能、目标以及这个系统能解决什么问题？
- 你怎么看待Typescript中大量存在any的现象？面对这样的场景你将有什么样的想法和行动？


