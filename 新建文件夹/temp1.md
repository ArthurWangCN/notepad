## undefined和null

两个都表示“无”。

+ 相似：
  + 值仅有一个，在 JavaScript 中，undefined 和 null 都是基础数据类型，他们的值有且仅有一个，分别为 undefined 和 null
  + 没有方法，undefined 和 null 都不能调用方法
  + 表示 无，转为布尔类型时，结果均为 false
+ 区别：
  + null 是一个关键字， undefined 不是关键字，当定义变量时， undefined 可以作为变量名， null 不行
  + null 的本质是一个标识为 '空' 的对象, undefined 是 window 对象的一个属性, 虽然 undefined 直接翻译的结果是 '未定义'，但实质上 undefined 是一个已经定义了的属性，只不过它的值叫做 '未定义'

用法：

+ null 表示"没有对象"，即该处不应该有值。典型用法是：

  1. 作为函数的参数，表示该函数的参数不是对象。

  2. 作为对象原型链的终点。

     ```js
     Object.getPrototypeOf(Object.prototype); // null
     ```

+ undefined 表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

  1. 变量被声明了，但没有赋值时，就等于 undefined。
  2. 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
  3. 对象没有赋值的属性，该属性的值为 undefined。
  4. 函数没有返回值时，默认返回 undefined。



## map和parseInt组合

> ["1", "2", "3"].map(parseInt) 答案是多少

[1, NaN, NaN] ，因为: 

+ parseInt 需要两个参数 (val, radix)，其中radix 表示解析时用的基数。
+ map传了 3个(element, index, array)，对应的 radix 不合法导致解析失败。



## use strict

+ 它不是一条语句，是一个字面量表达式，在 JavaScript 旧版本中会被忽略。
+ 目的是指定代码在严格条件下执行。
+ 作用：
  + 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
  + 消除代码运行的一些不安全之处，保证代码运行的安全；
  + 提高编译器效率，增加运行速度；
  + 为未来新版本的Javascript做好铺垫。

**严格模式的限制：**

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用with语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀0表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止this指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）



## JSON的了解

+ JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式

+ 它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小

+ JSON字符串转换为JSON对象:

  ```js
  var obj =eval('('+ str +')');
  var obj = JSON.parse(str);
  ```
  
+ JSON对象转换为JSON字符串：

  ```js
  var last=obj.toJSONString();
  var last=JSON.stringify(obj);
  ```

  

## defer和async

如果没有defer或async属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

![](https://upload-images.jianshu.io/upload_images/8825664-b83ec0c8e3038ba6.png?imageMogr2/auto-orient/strip|imageView2/2/w/689/format/webp)

*其中蓝色代表js脚本网络加载时间，红色代表js脚本执行时间，绿色代表html解析。*
defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析，其区别如下：

+ 执行顺序：多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行；
+ 脚本是否并行执行：async属性，表示后续文档的加载和执行与js脚本的加载和执行是并行进行的，即异步执行；defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded事件触发执行之前。

**小结：**
 defer 和 async 的共同点是都是可以并行加载JS文件，不会阻塞页面的加载，不同点是 defer的加载完成之后，JS会等待整个页面全部加载完成了再执行，而async是加载完成之后，会马上执行JS，所以假如对JS的执行有严格顺序的话，那么建议用 defer加载。



## attribute和property

> 在大多数的文章中，attribute 一般被翻译为“特性”，property 被译为“属性”。

+ attribute是dom元素在文档中作为html标签拥有的属性，如html中常用的id、class、title、align等。；
+ property是dom元素在js中作为对象拥有的属性，如childNodes、firstChild等。
+ HTML标签中定义的属性和值会保存该DOM对象的attributes属性里面，这些attribute属性的JavaScript中的类型是Attr，而不仅仅是保存属性名和值这么简单；



## 判断数组

+ arr instanceof Array;
+ arr.constructor == Array;
+ Object.prototype.toString.call(arr) == '[object Array]'
+ Array.isArray(arr)



## map与forEach的区别

默认有3个传参：分别是遍历的数组内容item、数组索引index、和当前遍历数组Array

forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

1. map速度比foreach快

2. map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组，foreach返回undefined

3. map因为返回数组所以可以链式操作，foreach不能

4. map里可以用return ,而foreach里用return不起作用，foreach不能用break，会直接报错



## 箭头函数

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`Rest`参数代替
- 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数



## 异步编程的实现方式

- 回调函数
  - 优点：简单、容易理解
  - 缺点：不利于维护，代码耦合高
- 事件监听(采用时间驱动模式，取决于某个事件是否发生)：
  - 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
  - 缺点：事件驱动型，流程不够清晰
- 发布/订阅(观察者模式)
  - 类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者
- Promise对象
  - 优点：可以利用then方法，进行链式写法；可以书写错误时的回调函数；
  - 缺点：编写和理解，相对比较难
- Generator函数
  - 优点：函数体内外的数据交换、错误处理机制
  - 缺点：流程管理不方便

- async函数
  - 优点：内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰。
  - 缺点：错误处理机制



## 如何渲染几万条数据并不卡住界面

> 这道题考察了如何在不卡住页面的情况下渲染数据，也就是说不能一次性将几万条都渲染出来，而应该一次渲染部分 `DOM`，那么就可以通过 `requestAnimationFrame` 来每 `16 ms` 刷新一次

```js
setTimeout(() => {
    // 插入十万条数据
    const total = 100000
    // 一次插入 20 条，如果觉得性能不好就减少
    const once = 20
    // 渲染数据总共需要几次
    const loopCount = total / once
    let countOfRender = 0
    let ul = document.querySelector("ul");
    function add() {
        // 优化性能，插入不会造成回流
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
            const li = document.createElement("li");
            li.innerText = Math.floor(Math.random() * total);
            fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
    }
    function loop() {
        if (countOfRender < loopCount) {
            window.requestAnimationFrame(add);
        }
    }
    loop();
}, 0);
```



## 节点的添加、删除等操作

创建新节点

```js
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
```

添加、移除、替换、插入

```js
appendChild()      //添加
removeChild()      //移除
replaceChild()      //替换
insertBefore()      //插入
```

查找

```js
getElementsByTagName()    //通过标签名称
getElementsByName()     //通过元素的Name属性的值
getElementById()        //通过元素Id，唯一性
```



## window onload 和 document ready

原生JS的window.onload与Jquery的$(document).ready(function(){})有什么不同：

+ `window.onload()` 方法是必须等到页面内包括图片的所有元素加载完毕后才能执行。
+ `$(document).ready()` 是DOM结构绘制完毕后就执行，不必等到加载完毕。

用原生JS实现Jq的ready方法：

```js
function ready(fn){
      if(document.addEventListener) {        //标准浏览器
          document.addEventListener('DOMContentLoaded', function() {
              //注销事件, 避免反复触发
              document.removeEventListener('DOMContentLoaded',arguments.callee, false);
              fn();            //执行函数
          }, false);
      }else if(document.attachEvent) {        //IE
          document.attachEvent('onreadystatechange', function() {
             if(document.readyState == 'complete') {
                 document.detachEvent('onreadystatechange', arguments.callee);
                 fn();        //函数执行
             }
         });
     }
 };
```



## addEventListener和attachEvent

+ addEventListener是符合W3C规范的标准方法; attachEvent是IE低版本的非标准方法；
+ addEventListener支持事件冒泡和事件捕获;  而attachEvent只支持事件冒泡；
+ addEventListener的第一个参数中,事件类型不需要添加on; attachEvent需要添加'on'；
+ 如果为同一个元素绑定多个事件, addEventListener会按照事件绑定的顺序依次执行, attachEvent会按照事件绑定的顺序倒序执行。

```js
if(obj.addEventListener){
     obj.addEventListener(events,fn,false);
}
else{
     obj.attachEvent('on'+events,fn);
}
```



## 简单实现双向绑定

```html
<input id="input"/>
```

```js
const data = {};
const input = document.getElementById('input');
Object.defineProperty(data, 'text', {
  set(value) {
    input.value = value;
    this.value = value;
  }
});
input.onChange = function(e) {
  data.text = e.target.value;
}
```



## JS事件循环

首先，js是单线程的，主要的任务是处理用户的交互，而用户的交互无非就是响应DOM的增删改，使用事件队列的形式，一次事件循环只处理一个事件响应，使得脚本执行相对连续，所以有了事件队列，用来储存待执行的事件，那么事件队列的事件从哪里被push进来的呢。那就是另外一个线程叫事件触发线程做的事情了，他的作用主要是在定时触发器线程、异步HTTP请求线程满足特定条件下的回调函数push到事件队列中，等待js引擎空闲的时候去执行，当然js引擎执行过程中有优先级之分，首先js引擎在一次事件循环中，会先执行js线程的主任务，然后会去查找是否有微任务microtask（promise），如果有那就优先执行微任务，如果没有，在去查找宏任务macrotask（setTimeout、setInterval）进行执行

众所周知 JS 是门非阻塞单线程语言，因为在最初 JS 就是为了和浏览器交互而诞生的。如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点）

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为

![](https://cos.poetries.work/gitee/2020/09/101.png)

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。

**微任务**

- `process.nextTick`
- `promise`
- `Object.observe`
- `MutationObserver`

**宏任务**

- `script`
- `setTimeout`
- `setInterval`
- `setImmediate`
- `I/O`
- `UI rendering`

宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务

**所以正确的一次 Event loop 顺序是这样的**

- 执行同步代码，这属于宏任务
- 执行栈为空，查询是否有微任务需要执行
- 执行所有微任务
- 必要的话渲染 UI
- 然后开始下一轮 `Event loop`，执行宏任务中的异步代码

通过上述的 `Event loop` 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 `DOM` 的话，为了更快的响应界面响应，我们可以把操作 `DOM` 放入微任务中



## ajax、axios、fetch

**ajax：**

```js
$.ajax({
   type: 'POST',
   url: url,
   data: data,
   dataType: dataType,
   success: function () {},
   error: function () {}
});
```

优缺点：

+ 本身是针对MVC的编程,不符合现在前端MVVM的浪潮
+ 基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案
+ JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务）

**axios：**

```js
axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
```

优缺点：

+ 从浏览器中创建 XMLHttpRequest
+ 从 node.js 发出 http 请求
+ 支持 Promise API
+ 拦截请求和响应
+ 转换请求和响应数据
+ 取消请求
+ 自动转换JSON数据
+ 客户端支持防止CSRF/XSRF

**fetch：**

```js
try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
```

优缺点：

- fetcht只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
- fetch默认不会带cookie，需要添加配置项
- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
- fetch没有办法原生监测请求的进度，而XHR可以



## JavaScript 组成

JavaScript 由以下三部分组成：

+ ECMAScript（核心）：JavaScript 语言基础
+ DOM（文档对象模型）：规定了访问HTML和XML的接口
+ BOM（浏览器对象模型）：提供了浏览器窗口之间进行交互的对象和方法



## 编写高性能的JavaScript

- 遵循严格模式：`"use strict";`
- 将js脚本放在页面底部，加快渲染页面
- 将js脚本将脚本成组打包，减少请求
- 使用非阻塞方式下载js脚本
- 尽量使用局部变量来保存全局变量
- 尽量减少使用闭包
- 使用 `window` 对象属性方法时，省略 `window`
- 尽量减少对象成员嵌套
- 缓存 `DOM` 节点的访问
- 通过避免使用 `eval()` 和 `Function()` 构造器
- 给 `setTimeout()` 和 `setInterval()` 传递函数而不是字符串作为参数
- 尽量使用直接量创建对象和数组
- 最小化重绘(`repaint`)和回流(`reflow`)



## Array 的 slice 和 splice

**slice：**

+ “读取”数组指定的元素，不会对原数组进行修改
+ 语法：arr.slice(start, end)
+ start 指定选取开始位置（含）
+ end 指定选取结束位置（不含）

**splice：**

+ “操作”数组指定的元素，会修改原数组，返回被删除的元素
+ 语法：arr.splice(index, count, [insert Elements])
+ index 是操作的起始位置
+ count = 0 插入元素，count > 0 删除元素
+ [insert Elements] 向数组新插入的元素



##  有四个操作会忽略enumerable为false的属性

- `for...in`循环：只遍历对象自身的和继承的可枚举的属性。
- `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
- `JSON.stringify()`：只串行化对象自身的可枚举的属性。
- `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。



## 埋点相关

为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

+ 能够完成整个 HTTP 请求+响应（尽管不需要响应内容）
+ 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
+ 跨域友好
+ 执行过程无阻塞
+ 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好
+ GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）
