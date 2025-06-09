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

app.use(express.json()); // 解析 JSON 请求体​

// 模拟的用户数据​
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// 定义一个简单的路由​
app.get("/", (req, res: express.Response) => {
  res.send("Hello, Express!");
});

// 获取全部 user
app.get("/users", (req, res) => {
  res.json(users);
});

// 创建 user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 获取单个 user
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// 更新 user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name;
  res.json(user);
});

// 删除 user
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");
  users.splice(userIndex, 1);
  res.status(204).send(); // 204 表示没有内容返回​
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

## 路由器（Router）

Router 是 Express 中的一个子路由器，可以将路由逻辑分组。它使得应用的路由结构更加清晰和模块化。

**src/main.ts**

```ts
import express from "express";
import { userRouter } from "./modules/users";

const app = express();

app.use(express.json()); // 解析 JSON 请求体​

// 定义一个简单的路由​
app.get("/", (req, res: express.Response) => {
  res.send("Hello, Express!");
});

// 将 userRouter 注册到 /users 路径​
app.use("/users", userRouter);

// 启动服务器​
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**src/modules/users.ts**

```ts
import express from "express";

// 定义用户相关的路由
export const userRouter = express.Router();

// 模拟的用户数据​
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

// 获取全部 user
userRouter.get("/", (req, res) => {
  res.json(users);
});

// 创建 user
userRouter.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 获取单个 user
userRouter.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// 更新 user
userRouter.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  user.name = req.body.name;
  res.json(user);
});

// 删除 user
userRouter.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("User not found");
  users.splice(userIndex, 1);
  res.status(204).send(); // 204 表示没有内容返回​
});
```

## 处理错误

在 Express 中可以通过错误处理中间件捕获并处理路由或其他中间件中的错误。

```ts
import express from "express";
import { Request, Response, NextFunction } from "express";

const app = express();

// 定义路由 ​
app.get("/", (req, res) => {
  throw new Error("Something went wrong!"); // 抛出错误 ​
});

// 错误处理中间件 ​
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// 兜底路由，处理未匹配的路径 ​
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// 启动服务器 ​
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

## Express 区分这两种中间件主要依靠它们函数签名的参数数量

- 标准中间件或路由处理函数： 接受三个参数 (req, res, next)。
- 错误处理中间件： 接受四个参数 (err, req, res, next)。

当您在 Express 应用中注册一个中间件时，Express 会检查其函数签名。

- 如果函数接受 四个 参数，Express 就认为它是一个错误处理中间件。
- 如果函数接受 三个 参数（或更少，尽管通常是三个），Express 就认为它是一个标准的中间件或路由处理函数。
- 当在处理请求过程中发生错误时（例如，通过调用 next(err) 或在同步代码中抛出异常），Express 会跳过所有标准的 (req, res, next) 中间件和路由处理函数，直接寻找下一个 错误处理中间件 ((err, req, res, next)) 来处理这个错误。

## 更多中间件与 express 开发细节

在 Express 中，中间件是扩展其功能的核心机制之一，它允许我们在请求处理的不同阶段执行逻辑操作。除了前面提到的内置中间件外，Express 社区中还存在许多强大的第三方中间件，用于处理身份验证、会话、跨域、cookie 等任务。下面我们详细讨论一些常用的中间件，比如 cookie-parser、jsonwebtoken（JWT）、以及其他常见的中间件。

### cookie-parser - 处理 Cookie

cookie-parser 是 Express 中用于解析客户端请求中 Cookie 的中间件。它可以从 HTTP 请求头中解析出 Cookie，并以对象的形式提供给开发者。

```bash
pnpm add cookie-parser
pnpm add -D @types/cookie-parser
```

```ts
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// 使用 cookie-parser 中间件​
app.use(cookieParser());

// 设置 cookie​
app.get("/setcookie", (req, res) => {
  res.cookie("username", "john_doe");
  res.send("Cookie has been set");
});

// 读取 cookie​
app.get("/getcookie", (req, res) => {
  let username = req.cookies["username"];
  if (username) {
    res.send(`Hello, ${username}`);
  } else {
    res.send("No cookie found");
  }
});

// 清除 cookie​
app.get("/clearcookie", (req, res) => {
  res.clearCookie("username");
  res.send("Cookie cleared");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

- res.cookie：用于设置 Cookie，支持指定过期时间、加密等。​
- req.cookies：通过 cookie-parser，可以直接从 req.cookies 读取解析后的 Cookie。

**Cookie 选项** ​
​
在设置 Cookie 时，可以指定一些选项，如 maxAge、secure 和 httpOnly。

```ts
res.cookie("username", "john_doe", { maxAge: 900000, httpOnly: true });
```

- maxAge: 设置 Cookie 的有效期，单位为毫秒。​
- httpOnly: 将 Cookie 标记为仅通过 HTTP 传输，不能通过 JavaScript 获取，增加安全性。​
- secure: 如果设置为 true，Cookie 仅通过 HTTPS 传输。

### jsonwebtoken - 使用 JWT 进行身份验证

jsonwebtoken 是用于生成和验证 JSON Web Tokens (JWT) 的库，通常用于在 Web 应用中进行身份验证。JWT 是一种紧凑的、URL 安全的令牌格式，它可以安全地传递信息并且可验证来源。

```bash
pnpm add jsonwebtoken
pnpm add -D @types/jsonwebtoken
```

```ts
import express from "express"; // 导入 Express 框架
import jwt from "jsonwebtoken"; // 导入 jsonwebtoken 库，用于生成和验证 JWT

// 定义一个自定义的 Request 接口，用于在请求对象上添加 user 属性
interface AuthenticatedRequest extends express.Request {
  user?: any; // 在 Request 对象上添加一个可选的 user 属性，用于存储解码后的用户信息
}

const app = express(); // 创建 Express 应用实例

app.use(express.json()); // 使用内置中间件解析 JSON 格式的请求体

const secretKey = "your-secret-key"; // 定义用于签名和验证 JWT 的密钥，请在实际应用中使用更安全的密钥并妥善保管

// 用户登录路由，用于生成 JWT 令牌
app.post("/login", (req, res) => {
  console.log("登录参数：", req.body);
  // 模拟用户数据，实际应用中应从数据库获取并验证用户凭据
  const user = { id: 1, username: req.body.username };
  // 使用 jwt.sign() 方法生成 JWT
  // 第一个参数是载荷 (payload)，通常包含用户ID等信息
  // 第二个参数是用于签名的密钥
  // 第三个参数是选项，这里设置令牌在 1 小时后过期
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  // 将生成的令牌作为 JSON 响应发送给客户端
  res.json({ token });
});

// 验证 JWT 的中间件
const authenticateToken = (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  // 从请求头中获取 Authorization 字段，通常格式为 "Bearer TOKEN"
  const authHeader = req.headers["authorization"];
  // 分割字符串，提取出令牌部分 (即 "Bearer " 后面的内容)
  const token = authHeader && authHeader.split(" ")[1];

  // 如果请求头中没有令牌，返回 401 Unauthorized 状态码
  if (token == null) return res.sendStatus(401);

  // 使用 jwt.verify() 方法验证令牌
  // 第一个参数是要验证的令牌
  // 第二个参数是用于验证的密钥
  // 第三个参数是回调函数，在验证完成后执行
  jwt.verify(token, secretKey, (err, user) => {
    // 如果验证失败 (例如令牌无效或过期)，返回 403 Forbidden 状态码
    if (err) return res.sendStatus(403);

    // 如果验证成功，将解码后的用户载荷存储到请求对象的 user 属性上
    req.user = user; // user 是解码后的载荷 (payload)
    // 调用 next() 将请求传递给下一个中间件或路由处理函数
    next();
  });
};

// 受保护的路由，只有通过 authenticateToken 中间件验证的请求才能访问
app.get(
  "/protected",
  authenticateToken,
  (req: AuthenticatedRequest, res: express.Response) => {
    // 如果请求到达这里，说明令牌已验证成功，并且用户信息存储在 req.user 中
    res.json({ message: "This is a protected route", user: req.user });
  }
);

// 启动服务器，监听 3000 端口
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

解析和验证 JWT 过程：

- 生成 JWT：使用 jwt.sign() 方法生成一个签名的 JWT，通常包含用户信息和一个加密密钥。生成时可以指定过期时间，如 1h 表示一小时。​
- 验证 JWT：通过 jwt.verify() 验证请求中的 JWT 是否有效。该函数会验证令牌是否通过我们指定的 secretKey 进行签名。​

JWT 的好处是可以在客户端和服务器之间传递经过签名的用户信息，而无需在服务器上存储会话状态。

## cors - 处理跨域请求

在 Web 应用开发中，跨域资源共享（CORS）是一种允许浏览器从不同的域请求资源的机制。Express 中的 cors 中间件使得处理跨域请求变得简单。

```bash
pnpm add cors
pnpm add -D @types/cors
```

```ts
import express from "express";
import cors from "cors";

const app = express();

// 使用 CORS 中间件​
app.use(cors());

// 可以限制允许的源​
// app.use(cors({ origin: 'http://example.com' }));
app.use(cors({ origin: ["http://example.com"] }));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

**ORS 选项 ​**
​

- origin: 允许的源，可以是一个特定的域名或者 `*`，表示所有源。​
- methods: 允许的 HTTP 方法，例如 GET, POST, PUT, DELETE。​
- credentials: 设置为 true 时，允许跨域请求发送 Cookie。

## express-session - 会话管理

TODO ...

## 拓展

- express 中间件的本质就是一个函数。如果想要拓展功能，就需要通过中间件来实现。
- 中间件的执行顺序是按照注册的顺序依次执行的，类似于洋葱模型，请求从外层到内层，响应从内层到外层。这种机制使得中间件可以对请求和响应进行处理，并且可以在请求处理的不同阶段插入自定义的逻辑。
- 中间件思维的一种应用：**插件化机制，插件底座+插件协议**
