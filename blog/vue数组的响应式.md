vue 改写了数组的七个方法：push、pop、shift、unshift、splice、sort、reverse。使数组改变的时候能够触发响应式，先把原来的 Array.prototype 的方法备份一份，再进行重写。

vue 的数组响应式是如何实现的？

**以 Array.prototype 为原型，创建了一个 arrayMethods 的对象（ Object.create（Array.prototype）），然后使用了一个强硬的手段，es6的语法，Object.setPrototypeOf(obj, arrayMethods)，强制的让  数组 的原型 `__proto__` 指向了 arrayMethods，这样就会触发重写的数组方法。**

https://s2.51cto.com/images/blog/202108/30/f0d344809a317e0186f501d7d94aee90.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=/format,webp/resize,m_fixed,w_1184

```js
import { def } from './utils';
const arrayPrototype = Array.prototype;

// 以 Array.prototype 为原型创建 arrayMethods 对象
export const arrayMethods = Object.create(arrayPrototype);

// 要被改写的七个方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice',
];
methodsNeedChange.forEach(item => {
  // 备份原来的方法，原有功能不能被剥夺
  const original = arrayPrototype[item];
  
  // 定义新的方法
  def(arrayMethods, item, function() {
    // 恢复原来的功能，this代表调用该方法的数组，arguments就是push的内容
    const result = original.apply(this, arguments);
    // 将类数组转换为数组
    const args = [...arguments];

    // 把这个数组身上的__ob__取出来，__ob__已经被添加了
    // 为什么已经被添加了？
    // 因为数组肯定不是最高层，比如 obj.g 属性是数组，obj不能是数组，
    // 第一次遍历 obj 这个对象的第一层的时候，已经给 g 属性添加了 __ob__属性。
    const ob = this.__ob__;
    
// 有三种方法 push、unshift、splice 能够插入新项，现在要把插入的新项也变为 observe 的
    let inserted = [];

    switch(item) {
      case 'push':
      case 'unshift':
        // push(新项)  unshift(插入的新项)
        inserted = arguments;
        break;
      case 'splice':
        // slice(下标，数量，插入的新项)
        inserted = args.slice(2);
        break;
    }
    // 让插入的新项也变成响应的
    if (inserted) {
      ob.observeArray(inserted);
    }
    console.log('啦啦啦');
    
    return result;
  }, false);
});
```

