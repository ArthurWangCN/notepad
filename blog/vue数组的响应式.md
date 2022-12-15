vue 改写了数组的七个方法：push、pop、shift、unshift、splice、sort、reverse。使数组改变的时候能够触发响应式，先把原来的 Array.prototype 的方法备份一份，再进行重写。

vue 的数组响应式是如何实现的？

**以 Array.prototype 为原型，创建了一个 arrayMethods 的对象（ Object.create（Array.prototype）），然后使用了一个强硬的手段，es6的语法，Object.setPrototypeOf(obj, arrayMethods)，强制的让  数组 的原型 __proto__指向了 arrayMethods，这样就会触发重写的数组方法。
**
