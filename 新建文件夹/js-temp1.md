## 1. JavaScript有哪些数据类型

JavaScript共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

这些数据可以分为原始数据类型和引用数据类型：

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）



## 2. 数据类型检测的方式有哪些

+ typeof

  ```js
  console.log(typeof 2);               // number
  console.log(typeof true);            // boolean
  console.log(typeof 'str');           // string
  console.log(typeof []);              // object    
  console.log(typeof function(){});    // function
  console.log(typeof {});              // object
  console.log(typeof undefined);       // undefined
  console.log(typeof null);            // object
  ```

  其中数组、对象、null都会被判断为object，其他判断都正确。

+ instanceof

  instanceof可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。

  ```js
  console.log(2 instanceof Number);                    // false
  console.log(true instanceof Boolean);                // false 
  console.log('str' instanceof String);                // false 
   
  console.log([] instanceof Array);                    // true
  console.log(function(){} instanceof Function);       // true
  console.log({} instanceof Object);                   // true
  ```

  可以看到，instanceof只能**正确判断引用数据类型**，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。

+ constructor

  ```js
  console.log((2).constructor === Number); // true
  console.log((true).constructor === Boolean); // true
  console.log(('str').constructor === String); // true
  console.log(([]).constructor === Array); // true
  console.log((function() {}).constructor === Function); // true
  console.log(({}).constructor === Object); // true
  ```

  constructor有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，constructor就不能用来判断数据类型了：

  ```js
  function Fn(){};
   
  Fn.prototype = new Array();
   
  var f = new Fn();
   
  console.log(f.constructor===Fn);    // false
  console.log(f.constructor===Array); // true
  ```

+ Object.prototype.toString.call

  使用 Object 对象的原型方法 toString 来判断数据类型：

  ```js
  var a = Object.prototype.toString;
   
  console.log(a.call(2));
  console.log(a.call(true));
  console.log(a.call('str'));
  console.log(a.call([]));
  console.log(a.call(function(){}));
  console.log(a.call({}));
  console.log(a.call(undefined));
  console.log(a.call(null));
  ```



## 3. 判断数组的方式

+ Object.prototype.toString.call；

  ```js
  Object.prototype.toString.call(arr);	// '[object Array]'
  ```

+ 原型链：`arr.__proto === Array.prototype`；

+ ES6 Array.isArray()；

+ instanceof；

+ Array.prototype.isPrototypeOf(arr)；



## 4. null和undefined区别
+ 首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。

+ undefined 代表的含义是**未定义**，null 代表的含义是**空对象**。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。

+ 当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。
+ 当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。



## 5. typeof null

typeof null 的结果是Object。

在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的类型标签(1-3 bits) 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：

```text
000: object   - 当前存储的数据指向一个对象。
  1: int      - 当前存储的数据是一个 31 位的有符号整数。
010: double   - 当前存储的数据指向一个双精度的浮点数。
100: string   - 当前存储的数据指向一个字符串。
110: boolean  - 当前存储的数据是布尔值。
```

如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度。

有两种特殊数据类型：

- undefined的值是 (-2)30(一个超出整数范围的数字)；
- null 的值是机器码 NULL 指针(null 指针的值全是 0)

那也就是说**null的类型标签也是000，和Object的类型标签一样**，所以会被判定为Object。





