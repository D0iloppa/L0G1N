const AuthService = require('../services/AuthService');
const jwt = require('jsonwebtoken');

const AuthController = {
  /**
   * @openapi
   * /api/login:
   *   post:
   *     summary: 로그인
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
   *                 example: email-pw
   *               login_id:
   *                 type: string
   *                 example: test@example.com
   *               input_val:
   *                 type: string
   *                 example: plain_or_hashed_password
   *               client_encrypt:
   *                 type: boolean
   *                 default: false
   *                 description: 클라이언트에서 암호화 여부
   *                 example: false
   *     responses:
   *       200:
   *         description: 로그인 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 account:
   *                   type: object
   *       400:
   *         description: 필수 입력값 누락
   *       401:
   *         description: 인증 실패
   *       404:
   *         description: 프로젝트/계정 없음
   *       500:
   *         description: 서버 오류
   */
  login: async (req, res) => {
    try {
      const { project_id, login_type, login_id, input_val, client_encrypt = false } = req.body;
      if (!project_id || !login_type || !login_id || !input_val) {
        return res.status(400).json({ error: '필수 입력값이 누락되었습니다.' });
      }
      const result = await AuthService.login(project_id, login_type, login_id, input_val, client_encrypt);
      if (result.success) {
        // JWT 토큰 생성
        const token = jwt.sign(
          { 
            account_id: result.account.account_id,
            project_id: project_id,
            login_id: login_id,
            login_type: login_type
          },
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '1h' }
        );

        // HTTP-only 쿠키 설정
        res.cookie('jwt_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000, // 1시간
          path: '/'
        });

        // Redis에 토큰 저장 (SRP 원칙에 따라 별도 함수로 분리)
        try {
          // RedisController.storeToken(token, result.account.account_id);
          // RedisController는 별도로 구현 예정
        } catch (redisError) {
          console.error('Redis 저장 오류:', redisError);
          // Redis 오류는 로그인을 막지 않음
        }

        res.json({ success: true, account: result.account });
      } else if (result.error === '프로젝트가 존재하지 않습니다.') {
        res.status(404).json({ error: result.error });
      } else if (result.error === '계정이 존재하지 않습니다.') {
        res.status(404).json({ error: result.error });
      } else if (result.error === '인증 실패(비밀번호 불일치)') {
        res.status(401).json({ error: result.error });
      } else {
        res.status(500).json({ error: '로그인 처리 중 알 수 없는 오류가 발생했습니다.' });
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      res.status(500).json({ error: '로그인 처리 중 오류가 발생했습니다.' });
    }
  },

  /**
   * @openapi
   * /api/logout:
   *   post:
   *     summary: 로그아웃
   *     tags:
   *       - Auth
   *     responses:
   *       200:
   *         description: 로그아웃 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *       500:
   *         description: 서버 오류
   */
  logout: async (req, res) => {
    try {
      // JWT 쿠키 제거
      res.clearCookie('jwt_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      // Redis에서 토큰 제거 (SRP 원칙에 따라 별도 함수로 분리)
      try {
        // RedisController.removeToken(req.cookies.jwt_token);
        // RedisController는 별도로 구현 예정
      } catch (redisError) {
        console.error('Redis 제거 오류:', redisError);
        // Redis 오류는 로그아웃을 막지 않음
      }

      res.json({ success: true, message: '로그아웃되었습니다.' });
    } catch (err) {
      console.error('로그아웃 오류:', err);
      res.status(500).json({ error: '로그아웃 처리 중 오류가 발생했습니다.' });
    }
  },

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
   *               client_encrypt:
   *                 type: boolean
   *                 default: false
   *                 description: 클라이언트에서 암호화 여부
   *                 example: false
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
      const { project_id, login_type, login_id, auth_key, client_encrypt = false, profile } = req.body;
      if (!project_id || !login_type || !login_id || !auth_key) {
        return res.status(400).json({ error: '필수 입력값이 누락되었습니다.' });
      }
      // 중복 체크
      const isDup = await AuthService.isDuplicateAccount(project_id, login_type, login_id);
      if (isDup) {
        return res.status(409).json({ error: '이미 가입된 계정입니다.' });
      }
      const account_id = await AuthService.register({ project_id, login_type, login_id, auth_key, client_encrypt, profile });
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
  
