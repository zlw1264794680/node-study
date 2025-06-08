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
