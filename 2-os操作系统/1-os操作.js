import os from 'node:os';

// 获取操作系统架构​
console.log(os.arch());  // arm64 / x64​

// 获取操作系统平台​
console.log(os.platform());  // darwin (macOS) / linux / win32​

// 获取系统 CPU 信息​
console.log(os.cpus(),os.cpus().length);

// 获取可用内存和总内存​
console.log(`Free memory: ${os.freemem()} bytes / ${os.freemem() / 1024 / 1024 / 1024} GB`);
console.log(`Total memory: ${os.totalmem()} bytes / ${os.totalmem() / 1024 / 1024 / 1024} GB`);

// 获取用户的主目录​
console.log(os.homedir());

// 获取系统运行时间​
console.log(`System uptime: ${os.uptime()} seconds / ${os.uptime() / 60 / 60} hours`);