# express

Express 是一个极简且灵活的 Node.js Web 应用框架，提供了一组强大而实用的功能，用于构建 Web 应用程序和 API。它简化了 Node.js 原生 HTTP 模块的使用，使开发者能够更轻松地处理路由、请求、响应等任务。

## 为什么使用 Express？​

- 简化路由：通过路由机制，Express 允许开发者轻松地为不同 URL 创建处理程序。​
- 中间件支持：Express 提供了中间件的支持，可以在请求处理的不同阶段执行特定逻辑。​
- 扩展性强：Express 可以通过各种第三方中间件和插件来扩展功能，如身份验证、日志记录、文件上传等。​
- 支持模板引擎：可以使用模板引擎如 EJS、Pug 渲染动态 HTML 页面。​

不过我们后续工作中可以选用 nest，他的工程化与设计理念比 express 更先进。

## 查询 express 版本

[npm 网址查看 express](https://www.npmjs.com/package/express?activeTab=versions)

```bash
# 查看最新版本（远程）
npm view express version

# 查看所有历史版本（远程）
npm view express versions

# 查看带详细信息的版本（远程）
npm info express

# 查看项目express版本（本地）
npm list express
pnpm list express
yarn list express
```

## 安装 package.json

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "tsc"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "22.15.30",
    "ts-node": "10.9.2",
    "typescript": "5.8.3",
    "express": "4.21.2",
    "@types/express": "4.17.21"
  }
}
```

## 路由系统 ​

Express 提供了简单的路由机制，允许根据 HTTP 方法和路径定义请求处理程序。路由可以定义为不同的 HTTP 动作（如 GET、POST 等），并绑定到特定的路径上。

```ts
import express from "express";

const app = express();

// 定义一个简单的路由​
app.get("/", (req, res: express.Response) => {
  res.send("Hello, Express!");
});

// 获取全部 user
app.get("/users", (req, res) => {
  res.send("Get all users");
});

// 创建 user
app.post("/users", (req, res) => {
  res.send("Create a new user");
});

// 获取单个 user
app.get("/users/:id", (req, res) => {
  res.send(`Get user with ID ${req.params.id}`);
});

// 更新 user
app.put("/users/:id", (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

// 删除 user
app.delete("/users/:id", (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`);
});

// 启动服务器​
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

在这个例子中，我们定义了多个路由来处理不同的 HTTP 请求类型和路径参数，包括了增删改查。 ​

## 使用中间件

中间件是在 Express 中处理请求和响应的核心机制。中间件函数可以拦截请求，执行某些操作，或者将请求传递给下一个中间件或最终的路由处理程序。

### 内置中间件

- express.json()：解析 application/json 类型的请求体。​
- express.static()：用于提供静态资源，如图片、CSS 文件等。​

```ts
// 使用内置中间件解析 JSON 请求体​
app.use(express.json());
// 使用内置中间件提供静态文件服务​
app.use(express.static("public"));
```

### 自定义中间件

自定义中间件可以拦截请求，进行身份验证、日志记录或其他逻辑。

```ts
// 自定义中间件，记录请求的时间​
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next(); // 调用 next() 传递请求给下一个中间件​
});
```

​

## 拓展

- express 中间件的本质就是一个函数。如果想要拓展功能，就需要通过中间件来实现。
- 中间件的执行顺序是按照注册的顺序依次执行的，类似于洋葱模型，请求从外层到内层，响应从内层到外层。这种机制使得中间件可以对请求和响应进行处理，并且可以在请求处理的不同阶段插入自定义的逻辑。
- 中间件思维的一种应用：**插件化机制，插件底座+插件协议**
