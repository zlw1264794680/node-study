import http from 'node:http'; // 导入 Node.js 内置的 http 模块

// 创建一个 HTTP 服务器实例
const server = http.createServer((req, res) => { // 为每个到来的请求调用此回调函数
    // 检查请求方法和 URL
    if (req.method === 'GET' && req.url === '/') {
        // 处理 GET / 请求
        res.writeHead(200, { 'Content-Type': 'application/json' }); // 设置响应头和状态码
        res.end(JSON.stringify({ message: 'Welcome to the GET request!' })); // 发送 JSON 响应体并结束响应
    } else if (req.method === 'POST' && req.url === '/submit') {
        // 处理 POST /submit 请求
        let body = ''; // 用于存储请求体数据
        req.on('data', (chunk) => { // 监听 'data' 事件，接收请求体数据块
            body += chunk.toString(); // 将数据块转换为字符串并拼接到 body
        });

        req.on('end', () => { // 监听 'end' 事件，请求体接收完毕时触发
            // 请求体接收完毕，发送响应
            res.writeHead(200, { 'Content-Type': 'application/json' }); // 设置响应头和状态码
            res.end(JSON.stringify({ message: 'Data received!', data: body })); // 发送包含接收到的数据的 JSON 响应
        });
    } else {
        // 处理所有其他请求 (未匹配的路径或方法)
        res.writeHead(404, { 'Content-Type': 'text/plain' }); // 设置状态码为 404 Not Found
        res.end('404 Not Found'); // 发送纯文本响应体
    }
});

// 启动服务器，监听 3000 端口
server.listen(3000, () => {
    console.log('Server listening on port 3000'); // 服务器启动成功后在控制台打印消息
});