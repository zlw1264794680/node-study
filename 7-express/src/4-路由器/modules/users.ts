
import express from 'express';

// 定义用户相关的路由
export const userRouter = express.Router();

// 模拟的用户数据​
let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
];

// 获取全部 user
userRouter.get('/', (req, res) => {
    res.json(users);
});

// 创建 user
userRouter.post('/', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 获取单个 user
userRouter.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    res.json(user);
});

// 更新 user
userRouter.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    user.name = req.body.name;
    res.json(user);
});

// 删除 user
userRouter.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if(userIndex === -1) return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.status(204).send(); // 204 表示没有内容返回​
});