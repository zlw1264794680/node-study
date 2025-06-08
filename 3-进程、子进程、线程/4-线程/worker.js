// worker.js
import { parentPort } from 'worker_threads';

// 监听主线程消息
parentPort.on('message', (msg) => {
    console.log('线程收到:', msg);
    parentPort.postMessage(`线程处理完毕: ${msg}`);
});
