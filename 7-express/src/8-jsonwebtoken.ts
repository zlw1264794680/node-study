import express from 'express'; // 导入 Express 框架
import jwt from 'jsonwebtoken'; // 导入 jsonwebtoken 库，用于生成和验证 JWT

// 定义一个自定义的 Request 接口，用于在请求对象上添加 user 属性
interface AuthenticatedRequest extends express.Request {
    user?: any; // 在 Request 对象上添加一个可选的 user 属性，用于存储解码后的用户信息
}

const app = express(); // 创建 Express 应用实例

app.use(express.json()); // 使用内置中间件解析 JSON 格式的请求体

const secretKey = 'your-secret-key'; // 定义用于签名和验证 JWT 的密钥，请在实际应用中使用更安全的密钥并妥善保管

// 用户登录路由，用于生成 JWT 令牌
app.post('/login', (req, res) => {
    console.log('登录参数：',req.body);
    // 模拟用户数据，实际应用中应从数据库获取并验证用户凭据
    const user = { id: 1, username: req.body.username };
    // 使用 jwt.sign() 方法生成 JWT
    // 第一个参数是载荷 (payload)，通常包含用户ID等信息
    // 第二个参数是用于签名的密钥
    // 第三个参数是选项，这里设置令牌在 1 小时后过期
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    // 将生成的令牌作为 JSON 响应发送给客户端
    res.json({ token });
});

// 验证 JWT 的中间件
const authenticateToken = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
    // 从请求头中获取 Authorization 字段，通常格式为 "Bearer TOKEN"
    const authHeader = req.headers['authorization'];
    // 分割字符串，提取出令牌部分 (即 "Bearer " 后面的内容)
    const token = authHeader && authHeader.split(' ')[1];

    // 如果请求头中没有令牌，返回 401 Unauthorized 状态码
    if (token == null) return res.sendStatus(401);

    // 使用 jwt.verify() 方法验证令牌
    // 第一个参数是要验证的令牌
    // 第二个参数是用于验证的密钥
    // 第三个参数是回调函数，在验证完成后执行
    jwt.verify(token, secretKey, (err, user) => {
        // 如果验证失败 (例如令牌无效或过期)，返回 403 Forbidden 状态码
        if (err) return res.sendStatus(403);

        // 如果验证成功，将解码后的用户载荷存储到请求对象的 user 属性上
        req.user = user; // user 是解码后的载荷 (payload)
        // 调用 next() 将请求传递给下一个中间件或路由处理函数
        next();
    });
};

// 受保护的路由，只有通过 authenticateToken 中间件验证的请求才能访问
app.get('/protected', authenticateToken, (req: AuthenticatedRequest, res: express.Response) => {
    // 如果请求到达这里，说明令牌已验证成功，并且用户信息存储在 req.user 中
    res.json({ message: 'This is a protected route', user: req.user });
});

// 启动服务器，监听 3000 端口
app.listen(3000, () => {
    console.log('Server running on port 3000');
});