const AdminService = require('../services/AdminService');

const AdminController = {
  showLoginForm: (req, res) => {
    res.render('admin/login', { error: null });
  },

  processLogin: async (req, res) => {
    const { username, password } = req.body;
    
    try {
      // AdminService를 사용한 인증
      const admin = await AdminService.authenticateAdmin(username.trim(), password.trim());
      
      if (admin) {
        req.session.admin = true;
        req.session.adminInfo = admin;
        res.redirect('/admin/dashboard');
      } else {
        res.render('admin/login', { error: '로그인 실패: 잘못된 로그인 정보입니다.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.render('admin/login', { error: '로그인 처리 중 오류가 발생했습니다.' });
    }
  },

  dashboard: async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    
    try {
      const projects = await AdminService.getAllProjects();
      res.render('admin/dashboard', { projects });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.render('admin/dashboard', { projects: [], error: '프로젝트 목록을 불러오는 중 오류가 발생했습니다.' });
    }
  },

  showCreateProjectForm: (req, res) => {
    res.render('admin/project_create', { error: null });
  },

  createProject: async (req, res) => {
    const { code, name } = req.body;
    
    try {
      // 프로젝트 코드 중복 확인
      const exists = await AdminService.isProjectExists(code);
      if (exists) {
        return res.render('admin/project_create', { error: '이미 존재하는 프로젝트 코드입니다.' });
      }
      
      // 프로젝트 생성
      await AdminService.createProject(code, name);
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error('Create project error:', error);
      res.render('admin/project_create', { error: '프로젝트 생성 중 오류가 발생했습니다.' });
    }
  },
};

module.exports = AdminController;
