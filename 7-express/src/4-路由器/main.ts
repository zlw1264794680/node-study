import express from 'express';
import {userRouter} from './modules/users';

const app = express();

app.use(express.json()); // 解析 JSON 请求体​

// 定义一个简单的路由​
app.get('/', (req, res: express.Response) => {
    res.send('Hello, Express!');
});

// 将 userRouter 注册到 /users 路径​
app.use('/users', userRouter);

// 启动服务器​
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});