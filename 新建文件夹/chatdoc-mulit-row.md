基于vue3 + element plus，实现类似chatdoc提问时超出到icon时另起一行。

原理：在输入的时候，创建一个canvas，并且绘制文字，计算文字的宽度，当宽度超过固定宽度时，添加一个 margin-bottom。

```html
<div class="bottom-input">
  <el-input
    type="textarea"]
    :class="{'multi-row': multiRow.value}"
    ref="textRef"
    autosize
    v-model="questionInput"
    placeholder="你可以对文档内容进行提问..."
    @onKeydown="handleKeyboardEnter"
    @onInput="handleInput"
  ></el-input>
  <span class="bottom-input-suffix">
    <img @click="handleSearch" :src="IconSend" class="cursor-pointer" alt="" />
  </span>
</div>
```

```js
// 计算是否超出一行
const multiRow = ref(false);
const textRef = ref();
const handleInput = (event: any) => {
  const inputElement = textRef.value.$refs.textarea;
  const text = event || questionInput.value;
  const fontSize = parseFloat(getComputedStyle(inputElement).fontSize);
  const maxWidth = (inputElement.offsetWidth - 40) || 230;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = `${fontSize}px sans-serif`;
    const textWidth = context.measureText(text).width;
    multiRow.value = textWidth >= maxWidth;
  }
};
```

```scss
.bottom-input {
  position: relative;
  border: 1px solid #DCDFE6;
  border-radius: 8px;
  .multi-row {
    margin-bottom: 28px;
  }
  .el-textarea__inner {
    max-height: 300px;
    box-shadow: none;
    resize: none;
  }
  .bottom-input-suffix {
    position: absolute;
    right: 8px;
    bottom: 4px;
    display: flex;
    align-items: center;
  }
}
```
