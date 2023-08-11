一个前端快速预览 .txt 文件的方法：

```vue
<template>
  <div>
    <pre>{{ textContent }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textContent: ''
    };
  },
  created() {
    this.loadTextFile();
  },
  methods: {
    async loadTextFile() {
      const txtFilePath = 'http://xxx/xxx.txt'; // 替换为实际的文件路径
      try {
        const response = await fetch(txtFilePath);
        if (response.ok) {
          this.textContent = await response.text();
        } else {
          console.error('Error loading text file:', response.statusText);
        }
      } catch (error) {
        console.error('Error loading text file:', error);
      }
    }
  }
};
</script>
```


