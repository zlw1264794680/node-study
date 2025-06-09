import express from 'express';
import cookieParser from 'cookie-parser'; 

const app = express();

// 使用 cookie-parser 中间件​
app.use(cookieParser());

// 设置 cookie​
app.get('/setcookie', (req, res) => {
    res.cookie('username', 'john_doe');
    res.send('Cookie has been set');
});

// 读取 cookie​
app.get('/getcookie', (req, res) => {
    let username = req.cookies['username'];
    if (username) {
        res.send(`Hello, ${username}`);
    } else {
        res.send('No cookie found');
    }
});

// 清除 cookie​
app.get('/clearcookie', (req, res) => {
    res.clearCookie('username');
    res.send('Cookie cleared');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});