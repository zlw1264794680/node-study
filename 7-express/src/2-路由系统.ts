import express from 'express';

const app = express();

app.use(express.json()); // 解析 JSON 请求体​

// 模拟的用户数据​
let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
];

// 定义一个简单的路由​
app.get('/', (req, res: express.Response) => {
    res.send('Hello, Express!');
});

// 获取全部 user
app.get('/users', (req, res) => {
    res.json(users);
});

// 创建 user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 获取单个 user
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    res.json(user);
});

// 更新 user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    user.name = req.body.name;
    res.json(user);
});

// 删除 user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if(userIndex === -1) return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.status(204).send(); // 204 表示没有内容返回​
});

// 启动服务器​
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});