const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dbClient = require('./dbClient');

// JSON 파싱 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 루트 경로 서빙
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// 헬스체크 엔드포인트
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 404 핸들러
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: '요청하신 경로를 찾을 수 없습니다.',
        path: req.originalUrl
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT}`);
});