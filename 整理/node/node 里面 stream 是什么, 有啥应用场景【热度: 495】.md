# node 里面 stream 是什么, 有啥应用场景【热度: 495】

在 Node.js 中，`stream` 是一种处理数据流的抽象机制。它可以让你以较小的内存占用、逐步处理数据，而不是将整个数据加载到内存中。这对于处理大量数据或实时数据传输时非常有用。

`stream` 主要有四种类型：

1. **Readable Stream**：可读取的数据流。例如，HTTP 请求的响应、文件读取等。
2. **Writable Stream**：可写入的数据流。例如，HTTP 请求的请求体、文件写入等。
3. **Duplex Stream**：同时可读可写的数据流。例如，TCP socket 或者一些需要同时进行读取和写入操作的情况。
4. **Transform Stream**：数据经过转换的流。例如，可以对流中的数据进行压缩、加密、解压等操作。

### 应用场景

1. **文件读取与写入**：
   比如，处理大文件时，直接将整个文件加载到内存可能会导致内存占用过高。而使用 `stream` 可以逐块读取文件，处理完一部分数据后再读取下一部分数据，避免内存溢出。

   ```js
   const fs = require('fs');
   const readStream = fs.createReadStream('large-file.txt');
   const writeStream = fs.createWriteStream('output.txt');

   readStream.pipe(writeStream);
   ```

2. **网络通信**：
   网络请求和响应通常是流式的。例如，HTTP 请求的响应体是一个 `Readable Stream`，而请求体则是一个 `Writable Stream`。可以通过流式操作处理大数据传输、实时数据等。

3. **管道操作**：
   `stream` 可以通过 `pipe()` 方法进行链式操作，像上面例子中一样，可以很方便地将一个流的输出接入到下一个流的输入。例如，你可以将文件流传输到压缩流，再传输到网络或其他存储位置。

4. **数据转换**：
   使用 `Transform Stream` 可以在数据流动过程中对数据进行转换。例如，你可以在数据传输过程中进行加密、解密、压缩、解压等操作。

5. **实时处理数据**：
   处理实时数据流时，`stream` 提供了高效的方式。例如，实时音视频流处理、实时日志处理等。

### 总结

`stream` 提供了一种高效的、低内存开销的方式来处理数据，特别适用于处理大量数据、流式数据传输、实时数据等场景。通过流，你可以边读边写，避免了将整个数据载入内存的开销。


### 四种底层 stream 类型代码示例

1、Readable（可读流）

实现方式与示例：可读流需要实现_read方法，通过push方法返回具体的数据，当push(null)时，表示流结束。文章给出了多种创建可读流的方式，包括直接创建实例、通过继承Readable类创建，以及结合生成器创建。例如，通过直接创建实例的方式如下：

```js
import { Readable } from "node:stream";
const readableStream = new Readable();
readableStream._read = function () {
  this.push("阿门阿前一棵葡萄树，");
  this.push("阿东阿东绿的刚发芽，");
  this.push("阿东背着那重重的的壳呀，");
  this.push("一步一步地往上爬。");
  this.push(null);
};
readableStream.on("data", (data) => {
  console.log(data.toString());
});
readableStream.on("end", () => {
  console.log("done");
});
```

**与其他API的关联**：文件读取流`fs.createReadStream`是基于`Readable`封装的，`http`服务的`request`对象也是`Readable`的实例。这意味着在处理HTTP请求时，可以像操作普通可读流一样读取请求数据。

2、Writable（可写流）

实现方式与特点：可写流要实现_write方法，用于接收写入的内容。其特点是可以通过控制next方法的调用时机，来控制消费数据的频率。例如，以下代码实现了一个简单的可写流，每 1 秒处理一次写入的数据：

```js
import { Writable } from "node:stream";
class WritableDong extends Writable {
  constructor(iterator) {
    super();
    this.iterator = iterator;
  }
  _write(data, enc, next) {
    console.log(data.toString());
    setTimeout(() => {
      next();
    }, 1000);
  }
}
function createWriteStream() {
  return new WritableDong();
}
const writeStream = createWriteStream();
writeStream.on("finish", () => console.log("done"));
writeStream.write("阿门阿前一棵葡萄树，");
writeStream.write("阿东阿东绿的刚发芽，");
writeStream.write("阿东背着那重重的的壳呀，");
writeStream.write("一步一步地往上爬。");
writeStream.end();
```

**与其他API的关联**：`fs.createWriteStream`是`Writable`的常见封装应用，`http`服务的`response`对象也是`Writable`实例，这使得在处理HTTP响应时，可以方便地向客户端写入数据。

3、Duplex（双工流）

实现方式与功能：双工流需要同时实现_read和_write方法，具备可读可写的功能。文章通过一个示例展示了双工流的实现：

```js
import { Duplex } from "node:stream";
class DuplexStream extends Duplex {
  _read() {
    this.push("阿门阿前一棵葡萄树，");
    this.push("阿东阿东绿的刚发芽，");
    this.push("阿东背着那重重的的壳呀，");
    this.push("一步一步地往上爬。");
    this.push(null);
  }
  _write(data, enc, next) {
    console.log(data.toString());
    setTimeout(() => {
      next();
    }, 1000);
  }
}
const duplexStream = new DuplexStream();
duplexStream.on("data", (data) => {
  console.log(data.toString());
});
duplexStream.on("end", (data) => {
  console.log("read done");
});
duplexStream.write("阿门阿前一棵葡萄树，");
duplexStream.write("阿东阿东绿的刚发芽，");
duplexStream.write("阿东背着那重重的的壳呀，");
duplexStream.write("一步一步地往上爬。");
duplexStream.end();
duplexStream.on("finish", (data) => {
  console.log("write done");
});
```

**实际应用**：TCP协议中的`socket`是`Duplex`的典型实现，通过`net`模块创建的TCP服务端和客户端，可以实现双向通信，其中`write`方法用于发送数据，`data`和`end`事件用于接收和处理数据。

4、Transform（转换流）

实现方式与功能：转换流继承自Duplex，需要实现_transform方法，对写入的内容进行转换后提供给消费者读取。例如，以下代码实现了一个将输入内容反转的转换流：

```js
import { Transform } from "node:stream";
class ReverseStream extends Transform {
  _transform(buf, enc, next) {
    const res = buf.toString().split("").reverse().join("");
    this.push(res);
    next();
  }
}
var transformStream = new ReverseStream();
transformStream.on("data", (data) => console.log(data.toString()));
transformStream.on("end", (data) => console.log("read done"));
transformStream.write("阿门阿前一棵葡萄树");
transformStream.write("阿东阿东绿的刚发芽");
transformStream.write("阿东背着那重重的的壳呀");
transformStream.write("一步一步地往上爬");
transformStream.end();
transformStream.on("finish", (data) => console.log("write done"));
```

**实际应用**：`zlib`模块中的`createGzip`是转换流的重要应用，可用于文件的压缩。通过`source.pipe(gzip).pipe(destination)`，可以将文件读取流经过`gzip`转换流后，传输到文件写入流，实现文件的压缩功能，也可以使用`pipeline` API简化操作。
