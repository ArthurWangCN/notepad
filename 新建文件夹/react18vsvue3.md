# React18 与 Vue3 全方面对比
## 编程风格 & 视图风格
### 编程风格

1、React 语法少、难度大；Vue 语法多，难度小：

例如指令：

Vue3
```html
<input v-model="username"/>
<ul>
  <li v-for="(item,index) in list" :key="index">{{ item }}</li>
</ul>
```

React18
```html
<input value={username} onChange={e => setUsername(e.target.value)}/>
<ul>
  { list.map((item,index) => <li key={index}>{item}</li>) }
</ul>
```

Vue 给我们提供了很多的指令功能，而这些功能在 React 中基本都需要我们使用原生 js 来实现。

所以会有很多人说: "使用 Vue 实际上你就是在操作 Vue，使用 React 实际上你是在操作 js"。

2、React 魔改少，手动实现；Vue 魔改多，自动完成。

例如事件：

Vue
```html
<button @click="handleClick('hello')">点击</button>
const handleClick = (msg) => {
  console.log('msg')
}
```

React
```html
<button onClick="handleClick('hello')">点击</button>
const handleClick = (msg) => {
  return () => {
    console.log(msg)
  }
}
```

像在点击事件中传参数这种功能：

- 我们知道 dom 的点击事件是需要我们传递一个函数过去的，就像在 React 中例子一样，你的 handleClick 肯定需要返回一个函数（或者在 jsx 中写箭头函数调用 handleClick）。
- 而在 Vue 中可以在 @click 中直接调用 handleClick 函数，而这个函数又没有返回一个新的函数，按道理这样调用 handleClick 是会返回 undefined 的，但是由于 Vue 底层做了魔改优化，使得我们不再需要在返回一个函数。

上面两个例子中，我们说不上哪种好哪种不好，只能说你更喜欢哪一种。React 中的实现更符合 js 的逻辑但却稍显麻烦，Vue 中的实现简单但却没有遵循原生 js 的特点。
编程风格上的总结：就像我们前面讲的，Vue 写起来更像是写 Vue 代码，React 写起来更像是写 JavaScript 代码。


https://juejin.cn/post/7210918245993611301#heading-8
