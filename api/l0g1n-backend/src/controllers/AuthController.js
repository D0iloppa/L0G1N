const AuthService = require('../services/AuthService');

exports.showLoginForm = (req, res) => {
    res.render('login');
};

exports.processLogin = async (req, res) => {
    const { login_id, password } = req.body;

    // 예시: DB 검증 (실제로는 AuthService 통해 검증)
    if (login_id === 'admin' && password === 'pass') {
        res.json({ success: true, message: '로그인 성공' });
    } else {
        res.status(401).json({ success: false, message: '로그인 실패' });
    }
};

exports.logout = (req, res) => {
    // 세션 제거, 쿠키 제거 등 처리
    res.json({ success: true, message: '로그아웃 완료' });
};
