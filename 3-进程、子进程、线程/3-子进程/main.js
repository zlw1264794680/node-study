// main.js
import { fork } from 'child_process';
console.log('主进程 PID:', process.pid);

// 创建一个新的子进程，运行 child.js
const child = fork('./child.js');

// 向子进程发送消息​
child.send('你好，子进程！');

// 接收子进程发来的消息​
child.on('message', (msg) => {
    console.log(`父进程接收到消息: ${msg}`);
});

/**
 * 输出：
 * 主进程 PID: 87123
 * 子进程 PID: 87124
 * 子进程接收到消息: 你好，子进程！
 * 父进程接收到消息: 你好，父进程！
 * 
 * 证明：
 * 子进程（独立内存）
 */