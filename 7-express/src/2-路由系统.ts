import express from 'express';

const app = express();

// 定义一个简单的路由​
app.get('/', (req, res: express.Response) => {
    res.send('Hello, Express!');
});

// 获取全部 user
app.get('/users', (req, res) => {
    res.send('Get all users');
});

// 创建 user
app.post('/users', (req, res) => {
    res.send('Create a new user');
});

// 获取单个 user
app.get('/users/:id', (req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
});

// 更新 user
app.put('/users/:id', (req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
});

// 删除 user
app.delete('/users/:id', (req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
});

// 启动服务器​
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});