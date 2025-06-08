# http 模块

http 模块是 Node.js 中的核心模块之一，专门用于构建基于 HTTP 的网络应用程序。​ 它允许我们创建 HTTP 服务器和客户端，处理网络请求和响应。

## http.createServer([options][, requestListener])​

http.createServer 是用于创建 HTTP 服务器的核心方法。它返回一个 http.Server 实例，可以监听指定的端口并处理请求。

```ts
import http from "node:http"; // 导入 Node.js 内置的 http 模块

const server = http.createServer(
  (_req: http.IncomingMessage, res: http.ServerResponse) => {
    // 创建一个 HTTP 服务器实例，并定义请求处理函数
    res.statusCode = 200; // 设置响应状态码为 200 (OK)
    res.setHeader("Content-Type", "text/plain"); // 设置响应头，指定内容类型为纯文本
    res.end("Hello, world!\n"); // 发送响应体内容并结束响应
  }
);

server.listen(3000, "127.0.0.1", () => {
  // 启动服务器，监听 3000 端口和本地 IP 127.0.0.1
  console.log("Server running at http://127.0.0.1:3000/"); // 服务器启动成功后在控制台打印消息
});
```

- **options** (可选): 用于提供服务器配置，允许指定 HTTP/1.1、HTTP/2 等协议。​
- **requestListener** (可选): 一个回调函数，在每次接收到客户端请求时调用。

### http.IncomingMessage​

表示服务器接收到的请求。它是一个可读流，用于获取请求体和元数据。​
​
**常用属性：​**

- req.method: 请求的方法（GET、POST 等）。​
- req.url: 请求的路径和查询参数。​
- req.headers: 请求的头部信息。​

### http.ServerResponse​

表示服务器对客户端的响应。它是一个可写流，用于发送响应数据。​
​
**常用方法：​**

- res.writeHead(statusCode[, headers]): 设置状态码和头部信息。​
- res.end([data[, encoding]][, callback]): 结束响应并可以发送数据。

## http.request(options[, callback])

用于创建 HTTP 客户端请求。

```ts
import http from "node:http"; // 导入 Node.js 内置的 http 模块

const options = {
  // 定义请求选项
  hostname: "www.google.com", // 目标主机名
  port: 80, // 目标端口号 (HTTP 默认端口)
  path: "/", // 请求路径
  method: "GET", // 请求方法
};

const req = http.request(options, (res) => {
  // 发起一个 HTTP 请求，并定义响应处理函数
  let data = ""; // 用于存储接收到的数据块
  res.on("data", (chunk) => {
    // 监听 'data' 事件，当接收到数据块时触发
    console.log("数据块:", chunk.toString()); // 在控制台打印接收到的数据块
    data += chunk; // 将接收到的数据块拼接到 data 变量中
  });

  res.on("end", () => {
    // 监听 'end' 事件，当响应接收完毕时触发
    console.log("返回数据：", data); // 在控制台打印完整的响应数据
  });
});

req.on("error", (e) => {
  // 监听 'error' 事件，当请求发生错误时触发
  console.error(`Problem with request: ${e.message}`); // 在控制台打印错误信息
});

req.end(); // 发送请求并结束请求
```

- **options**: 用于配置请求的目标、方法、头信息等。​
- **callback**: 处理响应的回调函数。

## http.get(options[, callback])

这是一个简化版的 http.request，专门用于 GET 请求。它自动调用 req.end()，不需要显式调用。

```ts
import http from "node:http"; // 导入 Node.js 内置的 http 模块

// Send GET request​
const getReq = http.get("http://localhost:3000", (res) => {
  // 发送一个 GET 请求到 http://localhost:3000
  let data = ""; // 用于存储接收到的响应数据

  // 监听 'data' 事件，当接收到数据块时触发
  res.on("data", (chunk) => {
    console.log("GET数据块:", chunk.toString()); // 在控制台打印接收到的数据块
    data += chunk; // 将接收到的数据块拼接到 data 变量中
  });

  // 监听 'end' 事件，当响应接收完毕时触发
  res.on("end", () => {
    console.log("GET Response:", data); // 在控制台打印完整的 GET 响应数据
  });

  // 可以添加错误处理，例如：
  // res.on('error', (err) => {
  //     console.error('GET Request Error:', err.message);  // 这是处理响应流中的错误
  // });
});

// 监听 'error' 事件，当 GET 请求本身发生错误时触发 (例如，服务器未启动)
getReq.on("error", (e) => {
  console.error(`GET Request Problem: ${e.message}`); // 在控制台打印错误信息
});
```

## 拓展 - WebSocket

通过 http 模块直接实现 WebSocket (WS) 协议是一项深入底层协议的工作。WebSocket 是基于 TCP 的协议，在其通信过程中，依赖于 HTTP 协议的握手机制，但通信方式和 HTTP 不同，它允许建立一个长期的、双向的连接。为了实现 WebSocket 服务器，我们需要结合对 HTTP 和 WebSocket 握手机制、数据帧协议以及 TCP/IP 模型的理解。
