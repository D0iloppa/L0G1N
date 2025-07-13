const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/check-duplicate', AuthController.checkDuplicate);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/login', AuthController.showLoginForm);       // 로그인 폼 (기존 유지)
router.post('/logout', AuthController.logout);            // 로그아웃 처리

module.exports = router;