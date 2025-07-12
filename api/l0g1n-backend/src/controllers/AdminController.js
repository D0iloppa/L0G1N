const AdminService = require('../services/AdminService');

const AdminController = {
  showLoginForm: (req, res) => {
    res.render('admin/login', { error: null, layout: 'layout' });
  },

  processLogin: async (req, res) => {
    const { username, password } = req.body;
    
    try {
      // AdminService를 사용한 인증
      const admin = await AdminService.authenticateAdmin(username.trim(), password.trim());
      
      if (admin) {
        // 로그인 시간 업데이트
        await AdminService.updateAdminLastLogin(admin.admin_id);
        
        req.session.admin = true;
        req.session.adminInfo = admin;
        res.redirect('/admin/dashboard');
      } else {
        res.render('admin/login', { error: '로그인 실패: 잘못된 로그인 정보입니다.', layout: 'layout' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.render('admin/login', { error: '로그인 처리 중 오류가 발생했습니다.', layout: 'layout' });
    }
  },

  dashboard: async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    
    try {
      const [topProjects, systemStats] = await Promise.all([
        AdminService.getTopProjects(),
        AdminService.getSystemStats()
      ]);
      const adminInfo = req.session.adminInfo;
      res.render('admin/dashboard', { 
        projects: topProjects, 
        adminInfo,
        systemStats,
        totalProjects: systemStats.active_projects,
        error: null,
        layout: 'layout'
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.render('admin/dashboard', { 
        projects: [], 
        adminInfo: req.session.adminInfo,
        error: '프로젝트 목록을 불러오는 중 오류가 발생했습니다.',
        layout: 'layout'
      });
    }
  },

  showCreateProjectForm: (req, res) => {
    res.render('admin/project_create', { error: null, layout: 'layout' });
  },

  createProject: async (req, res) => {
    const { project_code, project_name, status, project_type } = req.body;
    
    try {
      // 필수 필드 검증
      if (!project_code || !project_name) {
        return res.render('admin/project_create', { 
          error: '프로젝트 코드와 프로젝트 이름을 모두 입력해주세요.', 
          layout: 'layout' 
        });
      }
      
      // 프로젝트 코드 중복 확인
      const exists = await AdminService.isProjectExists(project_code);
      if (exists) {
        return res.render('admin/project_create', { error: '이미 존재하는 프로젝트 코드입니다.', layout: 'layout' });
      }
      
      // 프로젝트 생성
      await AdminService.createProjectExtended(project_code, project_name, status || 'active');
      res.render('admin/project_create', { 
        success: '프로젝트가 성공적으로 생성되었습니다!', 
        layout: 'layout' 
      });
    } catch (error) {
      console.error('Create project error:', error);
      res.render('admin/project_create', { error: '프로젝트 생성 중 오류가 발생했습니다.', layout: 'layout' });
    }
  },

  // 프로젝트 상세 페이지
  showProjectDetail: async (req, res) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    
    const { projectCode } = req.params;
    
    try {
      const project = await AdminService.getProjectByCode(projectCode);
      if (!project) {
        return res.status(404).render('error', { 
          code: 404, 
          message: '프로젝트를 찾을 수 없습니다.',
          layout: false 
        });
      }
      
      const projectApis = await AdminService.getProjectApis(project.project_id);
      const unlinkedAuthTypes = await AdminService.getUnlinkedAuthTypes(project.project_id);
      
      res.render('admin/project_detail', { 
        project, 
        projectApis, 
        unlinkedAuthTypes,
        layout: 'layout' 
      });
    } catch (error) {
      console.error('Project detail error:', error);
      res.status(500).render('error', { 
        code: 500, 
        message: '프로젝트 정보를 불러오는 중 오류가 발생했습니다.',
        layout: false 
      });
    }
  },

  // 프로젝트에 API 추가
  addProjectApi: async (req, res) => {
    if (!req.session.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { projectCode } = req.params;
    const { apiTypeId, prjApiKey } = req.body;
    
    try {
      const project = await AdminService.getProjectByCode(projectCode);
      if (!project) return res.status(404).json({ error: '프로젝트를 찾을 수 없습니다.' });
      await AdminService.addProjectApi(project.project_id, apiTypeId, prjApiKey);
      res.json({ success: true, message: 'API가 성공적으로 추가되었습니다.' });
    } catch (error) {
      console.error('Add project API error:', error);
      res.status(500).json({ error: 'API 추가 중 오류가 발생했습니다.' });
    }
  },

  // 프로젝트에서 API 제거
  removeProjectApi: async (req, res) => {
    if (!req.session.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { apiId } = req.params;
    
    try {
      await AdminService.removeProjectApi(apiId);
      res.json({ success: true, message: 'API가 성공적으로 제거되었습니다.' });
    } catch (error) {
      console.error('Remove project API error:', error);
      res.status(500).json({ error: 'API 제거 중 오류가 발생했습니다.' });
    }
  },

  // API: 전체 프로젝트 목록 조회 (모달용)
  getAllProjectsApi: async (req, res) => {
    if (!req.session.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const projects = await AdminService.getAllProjects();
      res.json({ projects });
    } catch (error) {
      console.error('Get all projects API error:', error);
      res.status(500).json({ error: '프로젝트 목록을 불러오는 중 오류가 발생했습니다.' });
    }
  },

  // API: 프로젝트 사용자 목록 조회
  getProjectUsersApi: async (req, res) => {
    if (!req.session.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { projectCode } = req.params;
    const { page = 1, size = 50 } = req.query;
    
    try {
      const users = await AdminService.getProjectUsers(projectCode, parseInt(page), parseInt(size));
      res.json({ users });
    } catch (error) {
      console.error('Get project users API error:', error);
      res.status(500).json({ error: '사용자 목록을 불러오는 중 오류가 발생했습니다.' });
    }
  },

  // API: 인증 코드 목록 조회
  getAuthCodesApi: async (req, res) => {
    if (!req.session.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const authCodes = await AdminService.getAuthCodes();
      res.json({ authCodes });
    } catch (error) {
      console.error('Get auth codes API error:', error);
      res.status(500).json({ error: '인증 코드 목록을 불러오는 중 오류가 발생했습니다.' });
    }
  },
};

module.exports = AdminController;
