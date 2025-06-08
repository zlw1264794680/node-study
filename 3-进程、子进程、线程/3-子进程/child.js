// child.js
console.log('子进程 PID:', process.pid);

process.on('message', (msg) => {
    console.log(`子进程接收到消息: ${msg}`);
    process.send(`你好，父进程！`);
});