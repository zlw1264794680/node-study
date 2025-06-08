// main.js
import { Worker } from 'worker_threads';

const worker = new Worker('./worker.js');

worker.on('message', (msg) => {
  console.log('主线程收到:', msg);
});

worker.postMessage('你好，我是主线程');


// 证明：工作线程（共享内存）

/**
 * 线程收到: 你好，我是主线程
 * 主线程收到: 线程处理完毕: 你好，我是主线程
 */