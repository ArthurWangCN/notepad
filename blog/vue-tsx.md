# 如何在 vue3 中使用 jsx/tsx

我们都知道,通常情况下我们使用 vue 大多都是用的 SFC(Signle File Component)单文件组件模式,即一个组件就是一个文件,但其实 Vue 也是支持使用 JSX 来编写组件的。这里不讨论 SFC 和 JSX 的好坏,这个仁者见仁智者见智。本篇文章旨在带领大家快速了解和使用 Vue 中的 JSX 语法,好让大家在 Vue 中遇到或使用 JSX 的时候能很快入手

## JSX 如何用
这里以vite项目为例,要想在项目中使用 JSX,我们需要安装一个插件 `@vitejs/plugin-vue-jsx`,这个插件可以让我们在项目中使用 JSX/TSX。

```bash
npm i @vitejs/plugin-vue-jsx -D
```

安装完成之后在vite.config.ts进行一个配置即可

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

接下来我们看一下如何使用 JXS?

首先第一种方式就是在.vue文件中使用,需要将 script 中的 lang 设置为tsx,在 setup 函数中返回模板

```vue
<script lang="tsx">
import { defineComponent } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    return () => <div>Hello World</div>;
  },
});
</script>
```

或者将.vue改成.tsx,注意:如果后缀为.tsx,需要将引入到这个组件的路径后缀去掉

```js
import { defineComponent } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    return () => <div>Hello World</div>;
  },
});
```

```ts
//main.ts中引入
import { createApp } from "vue";
import "./style.css";
import App from "./App";

createApp(App).mount("#app");
```

此时页面上就会展示一个Hello World
第二种方式是函数式组件,因为函数式组件里没有 this 引用，所以 Vue 把 props 当作第一个参数传入,第二个参数 ctx 包含三个属性：attrs、emit 和 slots。它们分别相当于组件实例的 attrs、attrs、attrs、emit 和 $slots 这几个属性。

```js
//App.tsx
export default (props, ctx) => <div>Hello World</div>;
```

到这里我们不难发现,TSX 相比于 SFC 有一个特点,那就是它可以在一个文件中定义多个组件模板,比如

```js
const Component1 = () => <div>Component1</div>;
const Component2 = () => <div>Component2</div>;

export default () => (
  <div>
    <Component1 />
    <Component2 />
  </div>
);
```

此时页面中便出现了我们定义的两个组件。

接下来我们来看一下 JSX 在 vue 中的具体用法。

## vue中的用法

### 插值

在 SFC 中使用插值的时候我们可以使用{{}}进行包裹,而在 JSX 中是使用{}进行包裹,例如

```jsx
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const text = ref("Hello World");
    return () => <div>{text.value}</div>;
  },
});
```

这里需要注意的是在 SFC 模板中是不需要加.value的,但是 JSX 模板中则需要加.value

### 条件渲染(v-if)

在 SFC 中我们可以使用v-if进行条件渲染,如

```html
<div>
  <div v-if="showyes">yes</div>
  <span v-else>no</span>
</div>
```

而在 JSX 中则没有了v-if,而是采用更接近原生的写法

```jsx
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const showyes = ref(true);
    return () => <div>{showyes.value ? <div>yes</div> : <div>no</div>}</div>;
  },
});
```

除了v-if,大家可能还会想到另一个条件渲染方式v-show,JSX 中是支持使用v-show的

```jsx
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const showyes = ref(true);
    return () => (
      <div>
        <div v-show={showyes.value}>yes</div>
        <div v-show={!showyes.value}>no</div>
      </div>
    );
  },
});
```

### 列表循环(v-for)
在 SFC 中我们经常使用v-for进行列表循环渲染,如

```html
<ul>
  <li v-for="{ index, item } in list" :key="index">{{ item }}</li>
</ul>
```

而在 JSX 中我们则需要改成使用 map 进行列表循环渲染

```jsx
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const list = ref(["one", "two", "three"]);
    return () => (
      <div>
        {list.value.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  },
});
```

注意,JSX 中列表循环也是要加 key 的

### 事件绑定
事件绑定其实 JSX 与 SFC 就是写法上的区别,以click为例,在 SFC 中使用@click或者v-on:click进行事件绑定,在 JSX 中则使用onClick进行事件绑定

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    return () => (
      <div
        onClick={() => {
          console.log("我被点击");
        }}
      >
        点击
      </div>
    );
  },
});
```

这里需要注意绑定的函数要使用箭头函数

### 事件修饰符
事件修饰符可以使用 vue 提供的withModifiers进行设置,如.self

```js
import { defineComponent, ref, withModifiers } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    return () => (
      <div
        onClick={withModifiers(() => {
          console.log("我被点击");
        }, ["self"])}
      >
        点击
      </div>
    );
  },
});
```

但是对于 .passive、.capture 和 .once 事件修饰符，使用withModifiers并不生效,这里可以采用链式驼峰的形式进行设置,如.once

```js
import { defineComponent } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    return () => (
      <div
        onClickOnce={() => {
          console.log("我被点击");
        }}
      >
        点击
      </div>
    );
  },
});
```

### v-model
v-model 在绑定modelValue或者在input标签中使用的时候其实和 SFC 差不多

```js
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const num = ref(0);
    return () => <input type="text" v-model={num.value} />;
  },
});
```

当在组件中使用绑定自定义事件的时候和 SFC 就有了区别,比如绑定一个msg,在 SFC 中直接v-model:msg即可,而在 JSX 中则需要使用一个数组。我们直接看下面两个例子你就会明白,假如我们组件名叫ea_button,这个组件发送了一个update:changeMsg的方法,父组件的msg变量需要接受update:changeMsg函数传来的参数

SFC:

```html
<ea-button v-model:changeMsg="msg"></ea-button>
```

jsx:

```html
<ea-button v-model={[msg.value, 'changeMsg']}></ea-button>
```

### 插槽

先看下默认插槽,我们定义一个子组件 Child 接收一个默认插槽

```js
import { defineComponent, ref } from "vue";
const Child = (props, { slots }) => {
  return <div>{slots.default()}</div>;
};

export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const num = ref(0);
    return () => <Child>默认插槽</Child>;
  },
});
```

如果想使用具名插槽则需要在父组件中传入一个对象,对象的 key 值就是插槽的名字

```js
import { defineComponent, ref } from "vue";
//@ts-ignore
const Child = (props, { slots }) => {
  return (
    <div>
      <div>{slots.slotOne()}</div>
      <div>{slots.slotTwo()}</div>
      <div>{slots.slotThree()}</div>
    </div>
  );
};

export default defineComponent({
  name: "app",
  setup(props, ctx) {
    const num = ref(0);
    return () => (
      <Child>
        {{
          slotOne: () => <div>插槽1</div>,
          slotTwo: () => <div>插槽2</div>,
          slotThree: () => <div>插槽3</div>,
        }}
      </Child>
    );
  },
});
```

如果我们想在父组件的插槽内容中获取到子组件中的变量,此时便涉及到了作用域插槽。在 JSX 中我们可以在子组件调用默认插槽或者某个具名插槽的时候传入参数,如下面的插槽一为例

```js
import { defineComponent, ref } from "vue";
//@ts-ignore
const Child = (props, { slots }) => {
  const prama1 = "插槽1";
  return (
    <div>
      <div>{slots.slotOne(prama1)}</div>
      <div>{slots.slotTwo()}</div>
      <div>{slots.slotThree()}</div>
    </div>
  );
};

export default defineComponent({
  name: "app",
  setup(props, ctx) {
    return () => (
      <Child>
        {{
          slotOne: (pramas: string) => <div>{pramas}</div>,
          slotTwo: <div>插槽2</div>,
          slotThree: <div>插槽3</div>,
        }}
      </Child>
    );
  },
});
```

我们可以看到prama1=插槽1是子组件中的变量,我们通过slots.slotOne(prama1)将其传到了父组件的插槽内容中

## 最后

关于 Vue3 中 JSX 的语法就介绍这么多,其实如果你熟悉 Vue 的 SFC 语法还是能很快上手 JSX 语法的,因为它们也就是写法上有一些区别,用法上还是基本一样的。至于选择哪一种写法还是取决于我们自己,我的建议是二者兼得,你可以根据实现不同的功能采用不同的写法。当然,如果你是一个团队项目,你还是乖乖听你领导的吧。



