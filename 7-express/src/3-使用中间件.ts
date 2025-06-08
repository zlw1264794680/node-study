import express from 'express';

const app = express();

// 中间件在路由处理之前注册

// 使用内置中间件解析 JSON 请求体​
app.use(express.json());

// 使用内置中间件提供静态文件服务​
app.use(express.static('public'));

// 自定义中间件，记录请求的时间​
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();  // 调用 next() 传递请求给下一个中间件​
});

// 定义一个简单的路由​
app.get('/', (req, res: express.Response) => {
    res.send('Hello, Express!');
});

// 启动服务器​
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});