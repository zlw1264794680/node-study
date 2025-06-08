import http from 'node:http'; // 导入 Node.js 内置的 http 模块

const server = http.createServer((_req:any, res:any) => { // 创建一个 HTTP 服务器实例，并定义请求处理函数
    res.statusCode = 200; // 设置响应状态码为 200 (OK)
    res.setHeader('Content-Type', 'text/plain'); // 设置响应头，指定内容类型为纯文本
    res.end('Hello, world!\n'); // 发送响应体内容并结束响应
});

server.listen(3000, '127.0.0.1', () => { // 启动服务器，监听 3000 端口和本地 IP 127.0.0.1
    console.log('Server running at http://127.0.0.1:3000/'); // 服务器启动成功后在控制台打印消息
});