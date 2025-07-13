const db = require('../db/dbClient');

const AuthService = {
  /**
   * 회원가입
   * @param {Object} params - 회원가입 정보
   * @param {number} params.project_id
   * @param {string} params.login_type
   * @param {string} params.login_id
   * @param {string} params.auth_key
   * @param {boolean} params.client_encrypt - 클라이언트에서 암호화 여부
   * @param {Object} params.profile - { nickname, extra_json }
   * @returns {Promise<number>} - 생성된 account_id
   */
  register: async ({ project_id, login_type, login_id, auth_key, client_encrypt = false, profile }) => {
    const client = await db.getClient();
    try {
      await client.query('BEGIN');
      // 1. l0g1n_account 생성
      const accountRes = await client.query(
        `INSERT INTO l0g1n_account (project_id, account_type) VALUES ($1, $2) RETURNING account_id`,
        [project_id, 'user']
      );
      const account_id = accountRes.rows[0].account_id;
      // 2. l0g1n_account_auth 생성 (getAuthKey 사용)
      let salt = undefined;
      if (login_type.endsWith('hashpw') && !client_encrypt) {
        // salt로 현재 시간 사용 (회원가입 시점)
        salt = new Date().toISOString();
      }
      const final_auth_key = await AuthService.getAuthKey(login_type, login_id, auth_key, { salt, client_encrypt });
      const authInsertRes = await client.query(
        `INSERT INTO l0g1n_account_auth (account_id, login_type, login_id, auth_key, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING updated_at`,
        [account_id, login_type, login_id, final_auth_key, salt || null]
      );
      // 3. l0g1n_account_profile 생성
      await client.query(
        `INSERT INTO l0g1n_account_profile (account_id, nickname, extra_json) VALUES ($1, $2, $3)`,
        [account_id, profile?.nickname || null, profile?.extra_json || {}]
      );
      await client.query('COMMIT');
      return account_id;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
  /**
   * 중복 가입 체크
   * @param {number} project_id
   * @param {string} login_type
   * @param {string} login_id
   * @returns {Promise<boolean>} - true면 이미 존재(중복)
   */
  isDuplicateAccount: async (project_id, login_type, login_id) => {
    const query = `
      SELECT 1
        FROM l0g1n_account_auth aa
        JOIN l0g1n_account a ON aa.account_id = a.account_id
       WHERE a.project_id = $1 AND aa.login_type = $2 AND aa.login_id = $3
       LIMIT 1
    `;
    const result = await db.query(query, [project_id, login_type, login_id]);
    return result.rows.length > 0;
  },
  /**
   * 인증 방식에 따라 입력값을 가공하여 auth_key 생성
   * @param {string} login_type
   * @param {string} login_id
   * @param {string} input_val (비밀번호, 토큰 등)
   * @param {object} [options] - { salt, client_encrypt }
   * @returns {Promise<string>} - 가공된 auth_key
   */
  getAuthKey: async (login_type, login_id, input_val, options = {}) => {
    const { client_encrypt = false } = options;
    
    let tmpInputVal = input_val;
    // 서버사이드 암호화
    if (!client_encrypt) {
        const crypto = require('crypto');
        tmpInputVal = crypto.createHash('sha256').update(login_id + input_val).digest('hex');
    }
    
    // 서버에서 암호화/해시 처리
    switch (login_type) {
      case 'id-pw':
      case 'email-pw':
        return input_val;
      case 'id-hashpw':
      case 'email-hashpw': {
        // hash + salt (salt는 updated_at)
        const salt = options.salt;
        if (!salt) throw new Error('Salt 값이 필요합니다.');
        // 예시: sha256(login_id + input_val + salt)
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(login_id + input_val + salt).digest('hex');
      }
      // 기타 인증 방식 확장 가능
      default:
        // 기본은 평문
        return input_val;
    }
  },
  /**
   * 로그인 인증
   * @param {number} project_id
   * @param {string} login_type
   * @param {string} login_id
   * @param {string} input_val (비밀번호, 토큰 등)
   * @param {boolean} client_encrypt - 클라이언트에서 암호화 여부
   * @returns {Promise<Object|null>} - 인증 성공시 account 정보, 실패시 null
   */
  login: async (project_id, login_type, login_id, input_val, client_encrypt = false) => {
    // 1. 프로젝트 유효성 검사
    const prjRes = await db.query('SELECT * FROM l0g1n_project WHERE project_id = $1', [project_id]);
    if (prjRes.rows.length === 0) return { error: '프로젝트가 존재하지 않습니다.' };
    // 2. 인증정보 조회
    const authRes = await db.query(
      `SELECT aa.*, a.account_type, a.status, a.account_id, aa.updated_at
         FROM l0g1n_account_auth aa
         JOIN l0g1n_account a ON aa.account_id = a.account_id
        WHERE a.project_id = $1 AND aa.login_type = $2 AND aa.login_id = $3
        LIMIT 1`,
      [project_id, login_type, login_id]
    );
    if (authRes.rows.length === 0) return { error: '계정이 존재하지 않습니다.' };
    const auth = authRes.rows[0];
    // 3. getAuthKey로 입력값 가공
    let salt = undefined;
    if (login_type.endsWith('hashpw') && !client_encrypt) {
      salt = auth.updated_at ? auth.updated_at.toISOString() : '';
    }
    const input_auth_key = await AuthService.getAuthKey(login_type, login_id, input_val, { salt, client_encrypt });
    // 4. 비교
    if (input_auth_key === auth.auth_key) {
      return { success: true, account: auth };
    } else {
      return { error: '인증 실패(비밀번호 불일치)' };
    }
  },
};

module.exports = AuthService;