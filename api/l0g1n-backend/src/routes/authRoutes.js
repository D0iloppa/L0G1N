const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/login', AuthController.showLoginForm);       // 로그인 폼
router.post('/login', AuthController.processLogin);       // 로그인 처리
router.post('/logout', AuthController.logout);            // 로그아웃 처리

module.exports = router;