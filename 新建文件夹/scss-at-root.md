如果你想在 SCSS 中为两个类添加相同的子类，可以使用 @at-root 指令和 & 选择器来实现。以下是一个示例：

```scss
.parent-class1,
.parent-class2 {
  @at-root {
    .common-child-class {
      /* 共同的子类属性 */
      color: red;
    }
  }
  
  /* 父类特定属性 */
  font-size: 16px;
}
```

在上述示例中，我们使用 , 选择器将 .parent-class1 和 .parent-class2 两个类选择器组合在一起。

然后，我们使用 `@at-root` 指令来在根选择器级别定义共同的子类 .common-child-class。这样，.common-child-class 将被应用到 .parent-class1 和 .parent-class2 这两个父类中。
