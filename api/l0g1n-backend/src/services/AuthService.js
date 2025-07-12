const db = require('../db/dbClient');

const AuthService = {
  /**
   * 회원가입
   * @param {Object} params - 회원가입 정보
   * @param {number} params.project_id
   * @param {string} params.login_type
   * @param {string} params.login_id
   * @param {string} params.auth_key
   * @param {Object} params.profile - { nickname, extra_json }
   * @returns {Promise<number>} - 생성된 account_id
   */
  register: async ({ project_id, login_type, login_id, auth_key, profile }) => {
    const client = await db.getClient();
    try {
      await client.query('BEGIN');
      // 1. l0g1n_account 생성
      const accountRes = await client.query(
        `INSERT INTO l0g1n_account (project_id, account_type) VALUES ($1, $2) RETURNING account_id`,
        [project_id, 'user']
      );
      const account_id = accountRes.rows[0].account_id;
      // 2. l0g1n_account_auth 생성
      await client.query(
        `INSERT INTO l0g1n_account_auth (account_id, login_type, login_id, auth_key) VALUES ($1, $2, $3, $4)`,
        [account_id, login_type, login_id, auth_key]
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
};

module.exports = AuthService;