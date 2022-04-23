# JS算法入门一：常用JS基础扫盲

## 介绍

此篇属于前端算法入门系列的第一篇，主要介绍常用的`数组方法`、`字符串方法`、`遍历方法`、`高阶函数`、`正则表达式`以及相关`数学知识`。



## 数组常用方法

**1.push**

在尾部追加，类似于压栈，原数组会变。

```js
const arr = [1, 2, 3]
arr.push(8)
console.log(arr) // [1, 2, 3, 8]
```

**2.pop**

在尾部弹出，类似于出栈，原数组会变。数组的 push 和 pop 可以模拟常见数据结构之一：**栈**。

```js
const arr = [1, 2, 3]
const popVal = arr.pop()
console.log(popVal) // 3
console.log(arr) // [1, 2]
// 数组模拟常见数据结构之一：栈
```

数组模拟常见数据结构之一：栈

```js
const stack = [0, 1]
stack.push(2) // 压栈
console.log(stack) // [0, 1, 2]

const popValue = stack.pop() // 出栈
console.log(popValue) // 2
console.log(stack) // [0, 1]
```

**3.unshift**

在头部压入数据，类似于入队，原数组会变。

```js
const arr = [1, 2, 3]
arr.unshift(0)
console.log(arr) // [0, 1, 2, 3]
```

**4.shift**

在头部弹出数据，原数组会变。数组的 push（入队） 和 shift（出队） 可以模拟常见数据结构之一：**队列**。

```js
const arr = [1, 2, 3]
const shiftVal = arr.shift()
console.log(shiftVal) // 1
console.log(arr) // [2, 3]

// 数组模拟常见数据结构之一：队列
const queue = [0, 1]
queue.push(2) // 入队
console.log(queue) // [0, 1, 2]

const shiftValue = queue.shift() // 出队
console.log(shiftValue) // 0
console.log(queue) // [1, 2]
```

