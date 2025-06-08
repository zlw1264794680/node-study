import http from 'node:http'; // 导入 Node.js 内置的 http 模块

const options = { // 定义请求选项
    hostname: 'www.google.com', // 目标主机名
    port: 80, // 目标端口号 (HTTP 默认端口)
    path: '/', // 请求路径
    method: 'GET', // 请求方法
};

const req = http.request(options, (res) => { // 发起一个 HTTP 请求，并定义响应处理函数
    let data = ''; // 用于存储接收到的数据块
    res.on('data', (chunk) => { // 监听 'data' 事件，当接收到数据块时触发
        console.log('数据块:', chunk.toString()); // 在控制台打印接收到的数据块
        data += chunk; // 将接收到的数据块拼接到 data 变量中
    });

    res.on('end', () => { // 监听 'end' 事件，当响应接收完毕时触发
        console.log('返回数据：',data); // 在控制台打印完整的响应数据
    });
});

req.on('error', (e) => { // 监听 'error' 事件，当请求发生错误时触发
    console.error(`Problem with request: ${e.message}`); // 在控制台打印错误信息
});

req.end(); // 发送请求并结束请求 