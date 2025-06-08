import { exec,spawn } from 'node:child_process'

// 使用 exec 执行 shell 命令​
exec('ls -lh', (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error}`);
        return;
    }
    console.log(`标准输出: ${stdout}`);
});

// 使用 spawn 启动进程
// 启动一个新的进程，执行 `ls -lh`​
const ls = spawn('ls', ['-lh']);
// 输出子进程的标准输出​
ls.stdout.on('data', (data) => {
    console.log(`输出: ${data}`);
});
// 捕获子进程的错误​
ls.stderr.on('data', (data) => {
    console.error(`错误: ${data}`);
});
// 监听子进程的退出事件​
ls.on('close', (code) => {
    console.log(`子进程退出，退出码: ${code}`);
});