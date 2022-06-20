## 水平居中

**1. 使用 text-align**

```css
.parent { text-align: center; }
.child { display: inline-block; }
```

**2. 定宽块级元素**

方法一：

```css
.child { margin: 0 auto; }
```

方法二：

```css
.child {
    position: relative;
    left: 50%;
    margin-left: -150px;	/* margin-left 值为宽度的一半 */
}
```

方法三：

```js
.parent {
    height: 300px;
  	position: relative;
}
.child {
    position: absolute;
  	left: 0;
  	right: 0;
  	margin: 0 auto;
}
```

方法四：

```css
.parent { position: relative; }
.child {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
```

**3. flex 布局**

```css
.parent {
    height: 300px;
    display: flex;
    justify-content: center;
}
```

**4. grid 布局**

```css
.parent {
    height: 300px;
    display: grid;
    /* 方法一 */
    justify-items: center;
    /* 方法二 */
    justify-content: center;
}
.child {
    /* 方法三 */
    margin: auto;
}
```



## 垂直居中

**1. 行内块级元素**

```css
.parent {
    line-height: 500px;
}
.child {
    display: inline-block;
    verticle-align: middle;
}
```

**2. 定位方式**

方法一：

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    margin-top: -150px; /* margin-top 值为高度的一半 */
}
```

方法二：

```css
.parent {
  	position: relative;
}
.child {
    height: 300px;
    position: absolute;
  	top: 0;
  	bottom: 0;
  	margin: auto;
}
```

方法三：

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transfrom: translateY(-50%);
}
```

