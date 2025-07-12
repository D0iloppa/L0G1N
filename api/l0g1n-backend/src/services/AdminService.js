const db = require('../db/dbClient');

const AdminService = {
  /**
   * 관리자 로그인 인증
   * @param {string} loginId - 로그인 ID
   * @param {string} authKey - 인증 키 (비밀번호)
   * @returns {Promise<Object|null>} - 인증된 관리자 정보 또는 null
   */
  authenticateAdmin: async (loginId, authKey) => {
    try {
      const query = `
        SELECT * FROM l0g1n_sys_admin lgnsa 
        WHERE login_id = $1 AND auth_key = $2
      `;
      
      const result = await db.query(query, [loginId, authKey]);
      
      if (result.rowCount > 0) {
        return result.rows[0];
      }
      
      return null;
    } catch (error) {
      console.error('AdminService.authenticateAdmin error:', error);
      throw error;
    }
  },

  /**
   * 모든 프로젝트 조회
   * @returns {Promise<Array>} - 프로젝트 목록
   */
  getAllProjects: async () => {
    try {
      const query = 'SELECT * FROM l0g1n_project ORDER BY created_at DESC';
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('AdminService.getAllProjects error:', error);
      throw error;
    }
  },

  /**
   * 프로젝트 생성
   * @param {string} projectCode - 프로젝트 코드
   * @param {string} projectName - 프로젝트 이름
   * @returns {Promise<Object>} - 생성된 프로젝트 정보
   */
  createProject: async (projectCode, projectName) => {
    try {
      const query = `
        INSERT INTO l0g1n_project (project_code, project_name) 
        VALUES ($1, $2) 
        RETURNING *
      `;
      
      const result = await db.query(query, [projectCode, projectName]);
      return result.rows[0];
    } catch (error) {
      console.error('AdminService.createProject error:', error);
      throw error;
    }
  },

  /**
   * 프로젝트 존재 여부 확인
   * @param {string} projectCode - 프로젝트 코드
   * @returns {Promise<boolean>} - 존재 여부
   */
  isProjectExists: async (projectCode) => {
    try {
      const query = 'SELECT COUNT(*) as count FROM l0g1n_project WHERE project_code = $1';
      const result = await db.query(query, [projectCode]);
      return parseInt(result.rows[0].count) > 0;
    } catch (error) {
      console.error('AdminService.isProjectExists error:', error);
      throw error;
    }
  }
};

module.exports = AdminService; 