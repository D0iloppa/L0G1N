const AuthService = require('../services/AuthService');

/**
 * @openapi
 * /login:
 *   get:
 *     summary: 로그인 페이지 렌더링
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: 로그인 폼 HTML 페이지
 */
exports.showLoginForm = (req, res) => {
    res.render('login');
  };
  
  /**
   * @openapi
   * /login:
   *   post:
   *     summary: 로그인 처리
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               login_id:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: 로그인 성공
   *       401:
   *         description: 인증 실패
   */
  exports.processLogin = async (req, res) => {
    // 로그인 처리 로직
  };
  
  /**
   * @openapi
   * /logout:
   *   post:
   *     summary: 로그아웃
   *     tags:
   *       - Auth
   *     responses:
   *       200:
   *         description: 로그아웃 성공
   */
  exports.logout = (req, res) => {
    res.json({ success: true });
  };

const AuthController = {
  /**
   * 회원가입 API
   */
  register: async (req, res) => {
    try {
      const { project_id, login_type, login_id, auth_key, profile } = req.body;
      if (!project_id || !login_type || !login_id || !auth_key) {
        return res.status(400).json({ error: '필수 입력값이 누락되었습니다.' });
      }
      // 중복 체크
      const isDup = await AuthService.isDuplicateAccount(project_id, login_type, login_id);
      if (isDup) {
        return res.status(409).json({ error: '이미 가입된 계정입니다.' });
      }
      const account_id = await AuthService.register({ project_id, login_type, login_id, auth_key, profile });
      res.json({ success: true, account_id });
    } catch (err) {
      console.error('회원가입 오류:', err);
      res.status(500).json({ error: '회원가입 처리 중 오류가 발생했습니다.' });
    }
  },

  /**
   * 중복체크 API
   */
  checkDuplicate: async (req, res) => {
    try {
      const { project_id, login_type, login_id } = req.body;
      if (!project_id || !login_type || !login_id) {
        return res.status(400).json({ error: '필수 입력값이 누락되었습니다.' });
      }
      const exists = await AuthService.isDuplicateAccount(project_id, login_type, login_id);
      res.json({ exists });
    } catch (err) {
      console.error('중복체크 오류:', err);
      res.status(500).json({ error: '중복체크 처리 중 오류가 발생했습니다.' });
    }
  },
};

module.exports = AuthController;
  
