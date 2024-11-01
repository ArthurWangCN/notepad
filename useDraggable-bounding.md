```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDraggable, useElementBounding, clamp } from '@vueuse/core';

const container = ref();
const draggable = ref();

const { left, right, top, bottom } = useElementBounding(container);
const { width, height } = useElementBounding(draggable);
const { x, y } = useDraggable(draggable);

const restrictedX = computed(() =>
  clamp(left.value, x.value, right.value - width.value)
);
const restrictedY = computed(() =>
  clamp(top.value, y.value, bottom.value - height.value)
);
</script>

<template>
  <div
    :style="{
      height: '100vh',
      background: 'teal',
      display: 'grid',
      placeItems: 'center',
    }"
  >
    <div
      :style="{
        background: 'white',
        width: '90%',
        height: '500px',
        position: 'relative',
      }"
      ref="container"
    >
      <div
        ref="draggable"
        :style="{
          userSelect: 'none',
          position: 'fixed',
          width: '100px',
          height: '100px',
          background: 'red',
          top: `${restrictedY}px`,
          left: `${restrictedX}px`,
        }"
      >
        I am draggable
      </div>
    </div>
  </div>
</template>
```
