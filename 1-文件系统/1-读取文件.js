// node官方提供的API
// import fs from 'fs'

// node 想区分官方模块和第三方模块
// 14.x 以上可以使用这个特性，用来区分事官方模块还是第三方模块，推荐 node：xxx。
import fs from 'node:fs'

// 其他API
import path from 'node:path'
import os from 'node:os'
import http from 'node:http'
import net from 'node:net'
import dgram from 'node:dgram'

// 读取文件，俩种模式：同步和异步，IO（Input/Outup）
// 同步最大的问题：阻塞，主进程
// 同步读取
const data = fs.readFileSync('./readme.md', 'utf-8');
console.log('同步读取', data);
// 异步读取
fs.readFile('./readme.md', 'utf-8', (err, data) => {
  if (err) {
    console.error('异步读取错误', err);
    return;
  }
  console.log('异步读取', data);
});

// 相对路径，在顶层目录下执行 node 文件系统/1-读取文件.js 报错，读取不到文件
// 原因：顶层目录下执行，相对路径是相对于当前终端的工作目录，而不是当前文件的目录
// 解决方案：使用绝对路径
