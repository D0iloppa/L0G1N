const AuthService = require('../services/AuthService');

const AuthController = {
  /**
   * @openapi
   * /api/register:
   *   post:
   *     summary: 회원가입
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               project_id:
   *                 type: integer
   *                 example: 1
   *               login_type:
   *                 type: string
   *                 example: email
   *               login_id:
   *                 type: string
   *                 example: test@example.com
   *               auth_key:
   *                 type: string
   *                 example: hashed_password
   *               profile:
   *                 type: object
   *                 properties:
   *                   nickname:
   *                     type: string
   *                     example: 홍길동
   *                   extra_json:
   *                     type: object
   *                     example: { "age": 30, "gender": "M" }
   *     responses:
   *       200:
   *         description: 회원가입 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 account_id:
   *                   type: integer
   *       400:
   *         description: 필수 입력값 누락
   *       409:
   *         description: 이미 가입된 계정
   *       500:
   *         description: 서버 오류
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
   * @openapi
   * /api/check-duplicate:
   *   post:
   *     summary: 회원가입 중복체크
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               project_id:
   *                 type: integer
   *                 example: 1
   *               login_type:
   *                 type: string
   *                 example: email
   *               login_id:
   *                 type: string
   *                 example: test@example.com
   *     responses:
   *       200:
   *         description: 중복 여부 반환
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 exists:
   *                   type: boolean
   *       400:
   *         description: 필수 입력값 누락
   *       500:
   *         description: 서버 오류
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
  
