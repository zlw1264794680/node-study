
import express from 'express';

// 定义用户相关的路由
export const userRouter = express.Router();

// 获取全部 user
userRouter.get('/', (req, res) => {
    res.send('Get all users');
});

// 创建 user
userRouter.post('/', (req, res) => {
    res.send('Create a new user');
});

// 获取单个 user
userRouter.get('/:id', (req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
});

// 更新 user
userRouter.put('/:id', (req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
});

// 删除 user
userRouter.delete('/:id', (req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
});