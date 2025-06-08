# typescript 支持

在 Node.js 项目中引入 TypeScript 支持可以提升代码的安全性、可读性和维护性。TypeScript 是 JavaScript 的超集，提供了类型系统和现代 ES6+ 特性的支持。它不仅帮助开发者避免常见的类型错误，还提供了更好的代码编辑器支持（如自动补全、类型检查等）。

## 如何在 Node.js 项目中添加 TypeScript 支持的详细步骤

### 安装 TypeScript 与 @types/node

```bash
pnpm add -D typescript @types/node
```

安装完 typescript 后，你可以通过以下命令检查版本，确认安装是否成功：

```bash
npx tsc --version
```

### 初始化 TypeScript 配置文件

TypeScript 使用 tsconfig.json 文件来管理编译选项和项目设置。你可以使用 tsc --init 命令在项目根目录下生成一个默认的 tsconfig.json 文件：

```bash
npx tsc --init
```

生成的 tsconfig.json 文件包含了许多配置选项，你可以根据需要进行修改。下面是一个常用的配置示例：

```json
{
  "ts-node": {
    // "esm":true, // 这里也不能写 "esm":true，不然ts-node运行会报错
    "transpileOnly": true // 仅进行转换，不进行类型检查，以提高速度
  },
  "compilerOptions": {
    "types": ["node"], // 指定需要包含的类型声明文件，这里包含 Node.js 的类型
    "target": "es5", // 指定编译后的 JavaScript 版本，如 ES5, ES6, ESNext
    "module": "nodenext", // 指定编译后的模块系统，Node.js 默认使用 CommonJS，nodenext 支持 ES Modules
    "moduleResolution": "nodenext", // 指定模块解析策略，如何查找模块文件
    "outDir": "./dist", // 指定编译输出文件的目录
    "rootDir": "./src", // 指定源代码文件的根目录
    "strict": true, // 启用所有严格的类型检查选项，推荐开启
    "esModuleInterop": true, // 允许 CommonJS 和 ES 模块之间的互操作性，改善导入兼容性
    "skipLibCheck": true, // 跳过所有声明文件（.d.ts）的类型检查，提高编译速度
    "forceConsistentCasingInFileNames": true, // 强制文件名使用一致的大小写，避免在不区分大小写的文件系统上出现问题
    "allowJs": true // 允许编译 JavaScript 文件
  },
  "include": ["src"], // 指定需要编译的文件或目录，这里包含 src 目录下的所有文件
  "exclude": ["node_modules"] // 指定编译时需要排除的文件或目录，通常排除 node_modules
}
```

### 添加 TypeScript 代码

在项目根目录下创建 src 文件夹，并在其中编写 TypeScript 代码。例如，创建一个简单的 src/index.ts 文件：

```ts
import { greet } from "./greet";

console.log(greet("Node.js with TypeScript"));
```

src/greet.ts

```ts
export const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

### 编译 TypeScript 代码

你可以通过以下命令将 TypeScript 代码编译成 JavaScript：​

```bash
npx tsc
```

​ 编译后的 JavaScript 代码将输出到 dist 目录（或根据 tsconfig.json 的配置决定）。输出的文件结构通常与源文件保持一致。

### 在 Node.js 中运行 TypeScript 编译后的代码

编译后，你可以通过 Node.js 运行输出的 JavaScript 文件。假设编译后的 index.js 位于 dist 目录下，使用以下命令运行它：

```bash
node dist/index.js
```

你应该能够看到输出：Hello, Node.js with TypeScript。

### 用 ts-node 直接运行 TypeScript 文件 !!!

在开发阶段，如果不想每次修改代码都编译，可以使用 ts-node 来直接运行 TypeScript 代码。ts-node 是一个可以直接执行 .ts 文件的工具。

首先安装 ts-node：

```bash
pnpm add -D ts-node
```

配置 package.json:

> 注意：这里不能写，`"type":"module"`，不然 ts-node 运行会报错

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/node": "22.15.30",
    "ts-node": "10.9.2",
    "typescript": "5.8.3"
  }
}
```

执行 script 命令：

```bash
npm run dev
```
