import express from 'express';
import { Request, Response, NextFunction } from 'express';

const app = express();

// 定义路由​
app.get('/', (req, res) => {
    throw new Error('Something went wrong!');  // 抛出错误​
});

// 错误处理中间件​
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// 兜底路由，处理未匹配的路径​
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// 启动服务器​
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});