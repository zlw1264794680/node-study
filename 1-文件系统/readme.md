# node 文件系统

## 配置 package.json

`npm init` 生成 `package.json`

```json
{
  "main": "index.js", // npm require commonjs 包入口​
  "module": "index.mjs", // ES Module 入口​
  "bin": { // 可执行文件入口​
    "miaoma-basic-cli": "./bin/basic"​
  },​
  "types": "index.d.ts", // 类型入口​
  "exports": { // 外部暴露模块入口​
    "./maioma.css": "./maioma.css"​
  },​
  "type": "module",
}
```

## 文件系统

了解 相对路径、绝对路径、`node:fs/promises`、`node:fs`、`node:path`等

## 拓展 - util.promisify

util.promisify 是 Node.js 提供的一个工具函数，它将传统回调风格的异步函数转换为返回 Promise 的函数。这样可以更方便地使用 async/await 来处理异步操作。

### 常用场景

许多 Node.js 核心模块（如 fs）的异步方法使用回调函数，可以使用 util.promisify 将它们转换为 Promise 风格，以便在现代异步代码中使用。

### 使用 util.promisify 将 fs.readFile 转换为 Promise 版本

```js
import fs from 'fs'
import util from 'util'
​
// 将 fs.readFile 转换为 Promise 风格​
const readFile = util.promisify(fs.readFile);​
​
// 使用 async/await 读取文件​
(async () => {​
  try {​
    const data = await readFile('./example.txt', 'utf-8');​
    console.log(data);​
  } catch (error) {​
    console.error(error);​
  }​
})();
```

通过 promisify，我们可以轻松将任何基于回调的异步函数转换为返回 Promise 的函数，这使得代码更加现代和简洁。

## 总结

- fs：用于文件操作，支持同步和异步 API。​
- path：提供文件路径处理功能，跨平台支持。​
- os：提供操作系统相关信息，如平台、内存、CPU。​
- process：与当前 Node.js 进程交互，获取命令行参数、环境变量等。​
- child_process：用于创建子进程，执行外部命令或脚本。​
- util.promisify：将回调风格的异步函数转换为 Promise，便于使用 async/await。
