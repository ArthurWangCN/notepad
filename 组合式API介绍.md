# 组合式API

## 介绍

### setup组件选项

+ setup 选项在**组件创建之前**执行，一旦 props 被解析，就将作为组合式 API 的入口。
+ 在 setup 中你应该**避免使用 this**，因为它不会找到组件实例。*（在data、computed、methods解析之前调用）*
+ setup 选项是一个接收 **props** 和 **context** 的**函数**。
+ setup 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

```js
setup (props) {
    // ...
    return {}
}
```



### 带 ref 的响应式变量

> ref 为我们的值创建了一个**响应式引用**。

+ 在 Vue 3.0 中，可以通过一个新的 **ref** 函数使任何响应式变量在任何地方起作用。
+ ref 接收参数并将其包裹在一个带有 **value** 属性的对象中返回。
+ 将值封装在一个对象中是为了保持 **JavaScript 中不同数据类型的行为统一**。*（Number 或 String 等基本类型是通过值而非引用传递的）*

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter) // { value: 0 }
console.log(counter.value) // 0

counter.value++
console.log(counter.value) // 1
```



### 在 setup 内注册生命周期钩子

组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on：即 mounted 看起来会像 onMounted。

```js
import { onMounted } from 'vue'

// 在我们的组件中
setup (props) {
  const fn = () => {
    // ...
  }

  onMounted(fn) // 在 `mounted` 时调用 `fn`
}
```



### watch 响应式更改

从 Vue 导入的 watch 函数设置侦听器，接收三个参数：

+ 一个想要侦听的响应式引用或 getter 函数
+ 一个回调
+ 可选的配置选项

```js
import { toRefs, watch } from 'vue'

setup (props) {
    const { user } = toRefs(props);
    watch(user, (newVal, oldVal) => {
        // ...
    })
}
```



上例中 toRefs 为了确保我们的侦听器能够根据 user prop 的变化做出反应。



### 独立的 computed 属性

+ computed 函数传递的第一个参数是一个类似 **getter** 的回调函数，输出的是一个**只读的响应式引用**。
+ 访问新创建的计算变量的 value，我们需要像 ref 一样使用 **.value**。

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

