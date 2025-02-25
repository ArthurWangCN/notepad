element-plus中的el-scrollbar可以设置上下滚动、左右滚动；左右滚动需要手写鼠标滚动事件，如下：

```html
  <el-scrollbar ref="scrollbarRef" @wheel.prevent="handleScroll">
  		<div class='menu'></div>
   </el-scrollbar>
```

```js
<script setup lang="ts">
	const scrollbarRef = ref()
	function handleScroll(e: any) {
	  const wheelDelta = e.wheelDelta || -e.deltaY * 40
	  scrollbarRef.value.setScrollLeft(scrollbarRef.value.wrapRef.scrollLeft - wheelDelta)
	}
</script>

```
