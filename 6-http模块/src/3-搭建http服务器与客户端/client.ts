import http from 'node:http'; // 导入 Node.js 内置的 http 模块

// Send GET request​
const getReq = http.get('http://localhost:3000', (res) => { // 发送一个 GET 请求到 http://localhost:3000
    let data = ''; // 用于存储接收到的响应数据

    // 监听 'data' 事件，当接收到数据块时触发
    res.on('data', (chunk) => {
        console.log('GET数据块:', chunk.toString()); // 在控制台打印接收到的数据块
        data += chunk; // 将接收到的数据块拼接到 data 变量中
    });

    // 监听 'end' 事件，当响应接收完毕时触发
    res.on('end', () => {
        console.log('GET Response:', data); // 在控制台打印完整的 GET 响应数据
    });

    // 可以添加错误处理，例如：
    // res.on('error', (err) => {
    //     console.error('GET Request Error:', err.message);  // 这是处理响应流中的错误
    // });
});

// 监听 'error' 事件，当 GET 请求本身发生错误时触发 (例如，服务器未启动)
getReq.on('error', (e) => {
    console.error(`GET Request Problem: ${e.message}`); // 在控制台打印错误信息
});

// Send POST request​
const postData = JSON.stringify({ name: 'John', age: 30 }); // 要发送的 POST 请求体数据，转换为 JSON 字符串

const options = { // 定义 POST 请求的选项
    hostname: 'localhost', // 目标主机名
    port: 3000, // 目标端口号
    path: '/submit', // 请求路径
    method: 'POST', // 请求方法
    headers: { // 请求头部
        'Content-Type': 'application/json', // 指定请求体的内容类型为 JSON
        'Content-Length': postData.length, // 指定请求体的长度
    },
};

const req = http.request(options, (res) => { // 发起一个 HTTP 请求 (POST)，并定义响应处理函数
    let data = ''; // 用于存储接收到的响应数据

    // 监听 'data' 事件，当接收到数据块时触发
    res.on('data', (chunk) => {
        console.log('POST数据块:', chunk.toString()); // 在控制台打印接收到的数据块
        data += chunk; // 将接收到的数据块拼接到 data 变量中
    });

    // 监听 'end' 事件，当响应接收完毕时触发
    res.on('end', () => {
        console.log('POST Response:', data); // 在控制台打印完整的 POST 响应数据
    });
});

// 监听 'error' 事件，当请求发生错误时触发
req.on('error', (e) => {
    console.error(`POST Request Problem: ${e.message}`); // 在控制台打印错误信息
});

req.write(postData); // 将 POST 数据写入请求体
req.end(); // 结束请求发送过程，发送请求体数据并完成请求

/**
 * GET Response: {"message":"Welcome to the GET request!"}
 * POST Response: {"message":"Data received!","data":"{\"name\":\"John\",\"age\":30}"}
 * 上面的注释是预期的输出结果示例
 */