ResizeObserver

> ResizeObserver 接口监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化。


在 JavaScript 中监听某个 <div> 元素尺寸变化，你可以使用 ResizeObserver API。ResizeObserver 是浏览器原生的 API，可以用来观察指定元素的大小调整。

以下是使用 ResizeObserver 监听 <div> 元素尺寸变化的示例：

```html
<div id="myDiv" style="width: 200px; height: 100px; border: 1px solid black;"></div>
```

```js
// 获取要监听尺寸变化的 div 元素
const targetDiv = document.getElementById('myDiv');

// 创建 ResizeObserver 实例
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    // 获取目标元素的新尺寸
    const newWidth = entry.contentRect.width;
    const newHeight = entry.contentRect.height;

    // 在这里执行处理尺寸变化的逻辑
    console.log(`New width: ${newWidth}px`);
    console.log(`New height: ${newHeight}px`);
  }
});

// 开始观察目标元素
resizeObserver.observe(targetDiv);

// 停止观察目标元素（如果不需要监听时）
// resizeObserver.unobserve(targetDiv);
```

在上述示例中，我们首先获取要监听尺寸变化的 <div> 元素，然后创建了一个 ResizeObserver 实例，并使用 observe 方法来开始观察目标元素的尺寸变化。

当目标元素的尺寸发生变化时，ResizeObserver 会触发回调函数，并传递一个 entries 数组作为参数。每个 entry 对象包含了目标元素的新尺寸信息，可以通过 entry.contentRect.width 和 entry.contentRect.height 来获取新的宽度和高度。

请注意，ResizeObserver API 在现代浏览器中得到支持，但在老旧浏览器中可能不被支持。如有必要，请先检查浏览器兼容性并提供相应的降级策略。
