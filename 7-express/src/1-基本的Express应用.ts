import express from 'express';

const app = express();

// 定义一个简单的路由​
app.get('/', (req, res: express.Response) => {
    res.send('Hello, Express!');
});

// 启动服务器​
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});