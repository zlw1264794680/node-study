import express from 'express';
import cors from 'cors';

const app = express();

// 使用 CORS 中间件​
app.use(cors());

// 可以限制允许的源​
// app.use(cors({ origin: 'http://example.com' }));
app.use(cors({ origin: ['http://example.com'] }));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});