# vue3 设置动态 ref 并获取

```vue
<template>
  <div v-for="item in list" :ref="(el: refItem) => setRefMap(el, item)" :key="item.name"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { ComponentPublicInstance } from 'vue';

type refItem = Element | ComponentPublicInstance | null

const list = [
  { name: 'ref1'},
  { name: 'ref2'},
  { name: 'ref3'},
  { name: 'ref4'},
]

const refMap: Record<string, refItem> = {}
const setRefMap = (el: refItem, item: {name: string}) => {
  if (el) {
    refMap[`${item.name}`] = el
  }
}

onMounted(() => {
  console.log(refMap)
})
</script>
```
